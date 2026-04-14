import * as pdfjsLib from 'pdfjs-dist';

// Use standard CDN for pdfjs worker so we don't have to bundle it
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  // Provide the data to PDF.js
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';
  // Loop through each page and extract text
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }
  return fullText;
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
