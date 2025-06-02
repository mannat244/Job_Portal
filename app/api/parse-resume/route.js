import { GoogleGenAI } from '@google/genai';

export const dynamic = 'force-dynamic';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request) {
  try {
    const body = await request.json();
    const { resumeUrl } = body;

    if (!resumeUrl) {
      return new Response(JSON.stringify({ error: 'Resume URL is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const pdfResp = await fetch(resumeUrl);
    if (!pdfResp.ok) throw new Error('Failed to fetch resume PDF');

    const buffer = await pdfResp.arrayBuffer();

    const contents = [
      {    text: `
Parse this resume and return only a clean JSON object in this format:

{
  "name": "Full name as a string",
  "phone": "Phone number as a string",
  "education": "Latest or highest education as a simple string",
  "experience": "fresher | junior | mid | senior",
  "skills": "Comma-separated string of technical skills"
}

Only return the JSON, no explanation or extra text.
` },
      {
        inlineData: {
          mimeType: 'application/pdf',
          data: Buffer.from(buffer).toString('base64'),
        },
      },
    ];

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents,
    });

    const rawText = result.text; // Gemini returns string
    console.log('Gemini Raw Response:\n', rawText);

    const jsonStart = rawText.indexOf('{');
    const jsonEnd = rawText.lastIndexOf('}');
    const jsonStr = rawText.slice(jsonStart, jsonEnd + 1);

    let parsed = {};
    try {
      parsed = JSON.parse(jsonStr);
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid JSON from Gemini', raw: rawText }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ profile: parsed }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error in parse-resume:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
