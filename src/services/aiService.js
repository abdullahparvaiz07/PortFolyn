import * as pdfjsLib from 'pdfjs-dist';

// Use the legacy worker for maximum browser compatibility
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/legacy/build/pdf.worker.min.js`;

async function extractTextFromPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ 
      data: arrayBuffer,
      // Disable worker to avoid path issues if the worker fails to load
      stopAtErrors: false
    });
    
    const pdf = await loadingTask.promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ')
        .replace(/\s+/g, ' '); // Clean up extra spaces
      fullText += pageText + ' ';
    }
    
    const result = fullText.trim();
    if (!result) {
      throw new Error('This PDF seems to be empty or contains only images/scans and no readable text.');
    }
    
    return result;
  } catch (err) {
    console.error("Internal PDF Error:", err);
    // Include the original error message to help us fix it!
    throw new Error(`PDF Error: ${err.message || 'Unknown error during extraction'}`);
  }
}

export async function parseCVFile(file) {
  // We now look for a Groq API Key!
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('Groq API key is not configured. Please add VITE_GROQ_API_KEY to your environment variables.');
  }

  let textToParse = '';

  // Extract pure text from the uploaded document!
  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
    try {
      textToParse = await extractTextFromPDF(file);
    } catch (e) {
      console.error("PDF Parsing Error:", e);
      throw new Error('Failed to extract text from the PDF document. Make sure it is a valid PDF.');
    }
  } else {
    // If it's a simple text document
    textToParse = await file.text();
  }

  if (!textToParse || textToParse.trim().length === 0) {
    throw new Error('No readable text could be found inside this document.');
  }

  const prompt = `You are an expert resume parser. Analyze this resume/CV document and extract all the information into a strict JSON payload. 
IF ANY field is missing or not applicable, leave it as an empty string ("") or empty array ([]). Do not invent information.

Return ONLY pure valid JSON matching EXACTLY this schema:
{
  "personal": {"name": "", "email": "", "phone": "", "linkedin": "", "address": "", "website": ""},
  "summary": "Professional summary...",
  "education": [{"school": "", "degree": "", "startYear": "", "endYear": "", "gpa": ""}],
  "experience": [{"company": "", "title": "", "startDate": "", "endDate": "", "description": "• description line 1\\n• description line 2"}],
  "skills": {"technical": ["React", "AWS"], "soft": ["Communication"]},
  "certifications": [{"name": "", "issuer": "", "date": ""}],
  "projects": [{"name": "", "description": "", "url": ""}],
  "languages": [{"name": "", "level": "Fluent"}]
}

Resume Text to analyze:
${textToParse}`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'user', content: prompt }
      ],
      temperature: 0.1,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Groq API Error:', errorText);
    let errorMsg = 'Failed to process CV with Groq AI.';
    try {
      const parsedError = JSON.parse(errorText);
      if (parsedError.error?.message) {
        errorMsg = parsedError.error.message;
      }
    } catch (e) {}
    throw new Error(`Groq API Error: ${errorMsg}`);
  }

  const data = await response.json();
  const rawJson = data.choices?.[0]?.message?.content;

  if (!rawJson) {
    throw new Error('Invalid empty response from AI parser.');
  }

  try {
    let cleanJson = rawJson.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```/, '').replace(/```$/, '').trim();
    }
    return JSON.parse(cleanJson);
  } catch (err) {
    console.error('JSON parsing failed:', err, rawJson);
    throw new Error('AI returned malformed Data, please try again.');
  }
}
