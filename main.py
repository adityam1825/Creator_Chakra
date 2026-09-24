from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
from typing import Optional
import os
import json
import re

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

MODEL = "deepseek/deepseek-chat-v3-0324:free"

app = FastAPI(title="Creator Chakra API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Helper ───────────────────────────────────────────────────────────────────

def call_ai(prompt: str) -> str:
    """Call OpenRouter and return the raw text response."""
    completion = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.85,
    )
    return completion.choices[0].message.content


def call_ai_json(prompt: str) -> dict:
    """Call OpenRouter, extract JSON from the response."""
    full_prompt = prompt + "\n\nIMPORTANT: Return ONLY valid JSON. No markdown, no code blocks, no explanation. Just the raw JSON object."
    raw = call_ai(full_prompt)
    # Strip markdown code fences if present
    raw = re.sub(r"```json\s*", "", raw)
    raw = re.sub(r"```\s*", "", raw)
    raw = raw.strip()
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        # Try to extract JSON from the response
        match = re.search(r'\{.*\}', raw, re.DOTALL)
        if match:
            return json.loads(match.group())
        raise HTTPException(status_code=500, detail=f"AI returned invalid JSON: {raw[:200]}")


# ─── Request Models ────────────────────────────────────────────────────────────

class ChakraBrainRequest(BaseModel):
    topic: str
    niche: str
    platform: str
    reelDuration: str
    tone: str
    targetAudience: Optional[str] = ""

class ChakraScoreRequest(BaseModel):
    mode: str          # "description" or "video"
    content: str
    niche: Optional[str] = ""
    platform: Optional[str] = "Instagram"

class ChakraTrendRequest(BaseModel):
    niche: str
    platform: str

class ChakraConnectRequest(BaseModel):
    niche: str
    platform: str
    followerCount: str
    contentStyle: str
    collabGoal: str

class ChakraGrowthRequest(BaseModel):
    niche: str
    platform: str
    currentFollowers: str
    postsPerWeek: int
    avgEngagementRate: str
    biggestChallenge: str
    goal: str

class VoiceToContentRequest(BaseModel):
    transcript: str
    platform: str
    contentType: str
    language: str

class RepurposeRequest(BaseModel):
    content: str
    targetFormats: list[str]
    tone: Optional[str] = "Engaging"

class MultilingualRequest(BaseModel):
    originalContent: str
    originalLanguage: str
    targetLanguage: str
    platform: str
    tone: str


# ─── Health Check ──────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"status": "Creator Chakra API is running", "model": MODEL}


# ─── ChakraBrain ──────────────────────────────────────────────────────────────

@app.post("/chakrabrain")
def chakra_brain(data: ChakraBrainRequest):
    prompt = f"""You are an elite viral content strategist and professional reel director specializing in {data.niche} content on {data.platform}.

Create a complete viral content blueprint for:
- Topic: {data.topic}
- Niche: {data.niche}
- Platform: {data.platform}
- Duration: {data.reelDuration}
- Tone: {data.tone}
{"- Target Audience: " + data.targetAudience if data.targetAudience else ""}

Return a JSON object with exactly these fields:

{{
  "viralConcept": "The unique angle that makes this reel stand out. 1-2 sentences.",
  "hook": "ONE sentence that stops the scroll in 2 seconds. Bold claim or curiosity gap. No 'Hey guys'.",
  "fullScript": "Complete word-for-word script with timestamps [0:00], [0:05] etc for a {data.reelDuration} video.",
  "shotByShot": [
    {{"shot": 1, "duration": "3s", "visual": "what camera shows", "dialogue": "what is said", "cameraAngle": "Close-up"}}
  ],
  "performanceTips": {{
    "facialExpressions": "specific expression guidance for {data.niche}",
    "bodyLanguage": "posture and movement tips",
    "energyLevel": "energy guidance",
    "pacing": "speaking pace"
  }},
  "musicSuggestion": {{
    "trackType": "type of music",
    "mood": "mood description",
    "examples": ["track 1", "track 2", "track 3"],
    "timing": "when to use music"
  }},
  "editingStyle": "Specific editing techniques for {data.niche} content on {data.platform}.",
  "caption": "Full caption with emojis, 3-5 sentences, drives saves and comments.",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8", "#tag9", "#tag10", "#tag11", "#tag12"],
  "cta": "Specific call-to-action.",
  "thumbnailText": "4-6 bold words for thumbnail",
  "viralPsychology": "2-3 sentences on psychological triggers (FOMO, curiosity, aspiration).",
  "estimatedViralScore": 85
}}

Include 4-6 shots in shotByShot. Make everything specific to {data.niche} on {data.platform}."""

    result = call_ai_json(prompt)
    return result


# ─── ChakraScore ──────────────────────────────────────────────────────────────

@app.post("/chakrascore")
def chakra_score(data: ChakraScoreRequest):
    if data.mode == "description":
        content_section = f'Content to analyze:\n"""\n{data.content}\n"""'
    else:
        content_section = f'Video URL to analyze: {data.content}\nAnalyze based on the platform, URL structure, and what kind of content this likely is.'

    prompt = f"""You are a viral content analyst who has studied 50,000+ viral posts.

{content_section}
{"Niche: " + data.niche if data.niche else ""}
{"Platform: " + data.platform if data.platform else ""}

Return a JSON object with exactly these fields:

{{
  "overallScore": 78,
  "verdict": "One punchy sentence about the content potential.",
  "breakdown": {{
    "hookStrength": 82,
    "retentionPotential": 75,
    "trendAlignment": 70,
    "emotionalImpact": 80,
    "clarityScore": 85,
    "ctaStrength": 65
  }},
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": [
    {{"issue": "specific problem", "fix": "exactly how to fix it", "impact": "+20% retention"}},
    {{"issue": "specific problem 2", "fix": "how to fix", "impact": "+15% shares"}}
  ],
  "improvedHook": "A dramatically better opening hook that stops the scroll.",
  "thumbnailSuggestion": "Specific thumbnail text and visual description.",
  "retentionAdvice": "2-3 specific tips to improve audience retention.",
  "contentIdeas": ["follow-up idea 1", "follow-up idea 2", "follow-up idea 3"],
  "predictedEngagement": {{
    "likes": "5K-15K",
    "comments": "200-500",
    "shares": "1K-3K",
    "saves": "2K-5K"
  }}
}}

All scores must be numbers 1-100. Be honest and specific."""

    result = call_ai_json(prompt)
    return result


# ─── ChakraTrend ──────────────────────────────────────────────────────────────

@app.post("/chakratrend")
def chakra_trend(data: ChakraTrendRequest):
    prompt = f"""You are a real-time social media trend analyst for {data.niche} content on {data.platform}.

Return a JSON object with exactly these fields:

{{
  "topTrends": [
    {{"trend": "trend name", "category": "category", "velocity": "+240%", "peakWindow": "Next 3-5 days", "howToUse": "specific advice for {data.niche}", "exampleAngle": "content angle"}}
  ],
  "trendingAudio": [
    {{"trackName": "track name", "mood": "mood", "bestFor": "content type", "usageCount": "2.4M uses"}}
  ],
  "trendingFormats": [
    {{"format": "format name", "description": "what it is", "engagementBoost": "+45% engagement"}}
  ],
  "trendingHashtags": [
    {{"hashtag": "#hashtag", "reach": "4.2M", "competition": "Medium"}}
  ],
  "nextBigTrend": "One sentence prediction for the next trend.",
  "contentIdea": "A complete ready-to-execute content idea using the top trend for {data.niche} on {data.platform}.",
  "urgencyLevel": "Post Now"
}}

Include 5 topTrends, 4 trendingAudio, 3 trendingFormats, 8 trendingHashtags.
urgencyLevel must be one of: "Post Now", "Post This Week", "Plan Ahead".
Be specific to {data.niche} on {data.platform}."""

    result = call_ai_json(prompt)
    return result


# ─── ChakraConnect ────────────────────────────────────────────────────────────

@app.post("/chakraconnect")
def chakra_connect(data: ChakraConnectRequest):
    prompt = f"""You are a creator collaboration strategist.

Creator Profile:
- Niche: {data.niche}
- Platform: {data.platform}
- Followers: {data.followerCount}
- Content Style: {data.contentStyle}
- Goal: {data.collabGoal}

Return a JSON object with exactly these fields:

{{
  "matches": [
    {{
      "creatorType": "descriptive creator archetype name",
      "nicheDescription": "what they create",
      "matchPercentage": 92,
      "audienceOverlap": "description of shared audience",
      "whyTheyMatch": "why this is a good match",
      "collabIdea": "specific ready-to-execute reel concept for both audiences",
      "expectedReach": "estimated combined reach",
      "approachScript": "genuine non-spammy DM to send them"
    }}
  ],
  "bestCollabFormat": "Best collaboration format for {data.collabGoal}.",
  "collabScript": "Complete DM outreach script to find collaborators.",
  "reelIdeas": ["collab idea 1", "collab idea 2", "collab idea 3", "collab idea 4"],
  "growthPotential": "Expected follower growth from these collaborations."
}}

Include 3 matches. Make collabIdeas creative and specific to {data.niche}."""

    result = call_ai_json(prompt)
    return result


# ─── ChakraGrowth ─────────────────────────────────────────────────────────────

@app.post("/chakragrowth")
def chakra_growth(data: ChakraGrowthRequest):
    prompt = f"""You are a creator growth strategist.

Creator Profile:
- Niche: {data.niche}
- Platform: {data.platform}
- Followers: {data.currentFollowers}
- Posts/Week: {data.postsPerWeek}
- Engagement Rate: {data.avgEngagementRate}
- Biggest Challenge: {data.biggestChallenge}
- Goal: {data.goal}

Return a JSON object with exactly these fields:

{{
  "growthScore": 72,
  "growthVerdict": "One sentence verdict on their growth trajectory.",
  "weeklyPlan": [
    {{"day": "Monday", "action": "specific task", "contentType": "Reel", "priority": "High"}},
    {{"day": "Tuesday", "action": "specific task", "contentType": "Story", "priority": "Medium"}},
    {{"day": "Wednesday", "action": "specific task", "contentType": "Reel", "priority": "High"}},
    {{"day": "Thursday", "action": "specific task", "contentType": "Engagement", "priority": "Low"}},
    {{"day": "Friday", "action": "specific task", "contentType": "Reel", "priority": "High"}},
    {{"day": "Saturday", "action": "specific task", "contentType": "Reel", "priority": "High"}},
    {{"day": "Sunday", "action": "specific task", "contentType": "Story", "priority": "Medium"}}
  ],
  "topRecommendations": [
    {{"recommendation": "specific action", "impact": "+30% reach", "effort": "Low", "timeframe": "Week 1"}},
    {{"recommendation": "specific action 2", "impact": "+20% engagement", "effort": "Medium", "timeframe": "Week 2"}},
    {{"recommendation": "specific action 3", "impact": "+15% followers", "effort": "High", "timeframe": "Month 1"}},
    {{"recommendation": "specific action 4", "impact": "+25% saves", "effort": "Low", "timeframe": "Week 1"}}
  ],
  "projectedGrowth": {{
    "oneMonth": "+2,500 followers",
    "threeMonths": "+9,000 followers",
    "sixMonths": "+25,000 followers"
  }},
  "contentMix": {{
    "educational": 35,
    "entertaining": 40,
    "personal": 15,
    "promotional": 10
  }},
  "keyInsight": "One powerful insight that directly addresses: {data.biggestChallenge}"
}}

priority must be High, Medium, or Low. contentMix must add to 100. Be specific to {data.niche} on {data.platform}."""

    result = call_ai_json(prompt)
    return result


# ─── VoiceToContent ───────────────────────────────────────────────────────────

@app.post("/voice-to-content")
def voice_to_content(data: VoiceToContentRequest):
    prompt = f"""You are an expert content transformer.

Raw voice transcript:
\"\"\"{data.transcript}\"\"\"

Platform: {data.platform}
Format: {data.contentType}
Language: {data.language}

Return a JSON object with exactly these fields:

{{
  "viralHook": "A magnetic opening line from the most impactful part of the transcript.",
  "mainContent": "Polished structured content for {data.platform} as a {data.contentType}. Clean up filler words, fix grammar, keep authentic voice.",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8", "#tag9", "#tag10"],
  "cta": "A compelling call to action.",
  "viralityScore": 78,
  "recommendations": ["tip 1", "tip 2", "tip 3"],
  "toneAnalysis": "One sentence describing the emotional tone detected."
}}"""

    result = call_ai_json(prompt)
    return result


# ─── Repurpose ────────────────────────────────────────────────────────────────

@app.post("/repurpose")
def repurpose_content(data: RepurposeRequest):
    formats_str = ", ".join(data.targetFormats)
    prompt = f"""You are an expert content repurposer.

Original Content:
\"\"\"{data.content}\"\"\"

Target Formats: {formats_str}
Tone: {data.tone}

Return a JSON object where each key is a format name and the value is the repurposed content.

Format guidelines:
- reels-caption: Short punchy caption with emojis and hashtags, max 150 words
- carousel-text: 5-7 slides, each starting with "Slide X:" on a new line
- linkedin-post: Professional, 150-300 words, no hashtag spam
- twitter-thread: Numbered tweets under 280 chars each, start with "1/"
- email-newsletter: Subject line + body, 200-400 words
- shorts-caption: 1-2 sentences + 5 hashtags

Only include keys for the requested formats: {formats_str}

Example structure:
{{
  "reels-caption": "content here...",
  "twitter-thread": "content here..."
}}"""

    result = call_ai_json(prompt)
    return result


# ─── Multilingual ─────────────────────────────────────────────────────────────

@app.post("/multilingual")
def multilingual_content(data: MultilingualRequest):
    prompt = f"""You are an expert multilingual content creator.

Original Content: {data.originalContent}
From: {data.originalLanguage}
To: {data.targetLanguage}
Platform: {data.platform}
Tone: {data.tone}

Return a JSON object with exactly these fields:

{{
  "translatedContent": "Translated and culturally adapted content in {data.targetLanguage}. Adjust idioms and references to feel native.",
  "culturalToneAdaptationDescription": "One paragraph explaining the key cultural changes made.",
  "localHashtags": ["#localtag1", "#localtag2", "#localtag3", "#localtag4", "#localtag5", "#localtag6", "#localtag7", "#localtag8"]
}}"""

    result = call_ai_json(prompt)
    return result
