const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove the data URL prefix (e.g., 'data:application/pdf;base64,')
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
}

export async function parseCVFile(file) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured.');
  }

  const mimeType = file.type || 'application/pdf';
  const base64Data = await fileToBase64(file);

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
}`;

  const payload = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.1,
      responseMimeType: "application/json"
    }
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API Error:', errorText);
    throw new Error('Failed to parse CV document.');
  }

  const data = await response.json();
  const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!rawJson) {
    throw new Error('Invalid response from AI parser.');
  }

  try {
    return JSON.parse(rawJson);
  } catch (err) {
    console.error('JSON parsing failed:', err, rawJson);
    throw new Error('AI returned malformed data.');
  }
}
