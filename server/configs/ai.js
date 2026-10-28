import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const USE_OPENAI = Boolean(OPENAI_API_KEY);
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const ai = OPENAI_API_KEY ? new OpenAI({ apiKey: OPENAI_API_KEY }) : null;

const geminiClient = GEMINI_API_KEY
  ? new OpenAI({
    apiKey: GEMINI_API_KEY,
    baseURL: process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/openai/",
  })
  : null;

const DEFAULT_MODELS = [
  GEMINI_MODEL,
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
].filter(Boolean);

const callOpenAI = async ({ systemPrompt, userPrompt, temperature = 0.7, maxTokens = 300 }) => {
  if (!ai) {
    throw new Error("OpenAI API key is missing.");
  }

  return ai.chat.completions.create({
    model: OPENAI_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature,
    max_tokens: maxTokens,
  });
};

const callGemini = async ({ systemPrompt, userPrompt, temperature = 0.7, maxTokens = 300 }) => {
  if (!geminiClient) {
    throw new Error("Gemini API key is missing.");
  }

  let lastError;

  for (const model of DEFAULT_MODELS) {
    try {
      const response = await geminiClient.chat.completions.create({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature,
        max_tokens: maxTokens,
      });

      return response;
    } catch (error) {
      const message = error?.message || "";
      const isMissingModel = error?.status === 404 || /not available|not found|NOT_FOUND/i.test(message);

      lastError = error;

      if (!isMissingModel) {
        throw error;
      }
    }
  }

  throw lastError;
};

const callAI = async ({ systemPrompt, userPrompt, temperature = 0.7, maxTokens = 300 }) => {
  if (USE_OPENAI && ai) {
    return callOpenAI({ systemPrompt, userPrompt, temperature, maxTokens });
  }

  if (geminiClient) {
    return callGemini({ systemPrompt, userPrompt, temperature, maxTokens });
  }

  throw new Error("No AI provider is configured. Set OPENAI_API_KEY or GEMINI_API_KEY.");
};

const parseJsonResponse = (content) => {
  if (!content) return null;

  const cleanContent = content
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleanContent);
  } catch (error) {
    return { raw: cleanContent };
  }
};

export const generateResumeDescription = async (resumeData = {}) => {
  const prompt = `
    Write a polished professional resume summary for this candidate.
    Candidate details:
    - Name: ${resumeData.personal_info?.full_name || "N/A"}
    - Profession: ${resumeData.personal_info?.profession || "N/A"}
    - Location: ${resumeData.personal_info?.location || "N/A"}
    - Experience: ${resumeData.experience?.length || 0} roles
    - Skills: ${(resumeData.skills || []).join(", ") || "N/A"}
    - Existing summary: ${resumeData.professional_summary || "N/A"}

    Requirements:
    - 3 to 4 concise sentences
    - Strong professional tone
    - Highlight achievements, strengths, and value
    - Keep it ATS-friendly and easy to read
  `;

  const response = await callAI({
    systemPrompt: "You are an expert resume writer. Create concise, professional, polished resume summaries.",
    userPrompt: prompt,
    temperature: 0.7,
    maxTokens: 300,
  });

  return (
    response.choices?.[0]?.message?.content?.trim() ||
    "Unable to generate resume summary at the moment."
  );
};

export const analyzeResume = async (resumeData = {}) => {
  const prompt = `
    Analyze this resume and provide a structured JSON result.
    Fields required:
    - overallScore (number from 1 to 10)
    - strengths (array of strings)
    - improvements (array of strings)
    - fitForRole (string)
    - suggestions (array of strings)

    Resume data:
    ${JSON.stringify(resumeData, null, 2)}
  `;

  const response = await callAI({
    systemPrompt: "You are a professional resume analyst. Return valid JSON only with overallScore, strengths, improvements, fitForRole, and suggestions.",
    userPrompt: prompt,
    temperature: 0.5,
    maxTokens: 500,
  });

  const content = response.choices?.[0]?.message?.content || "{}";
  return parseJsonResponse(content);
};

export default ai;
