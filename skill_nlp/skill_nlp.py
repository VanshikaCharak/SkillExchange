from sentence_transformers import SentenceTransformer, util
from typing import List
import re

model = SentenceTransformer("all-MiniLM-L6-v2")

SKILL_TAXONOMY = {
    "Python":           "Programming",
    "JavaScript":       "Programming",
    "C++":              "Programming",
    "Java":             "Programming",
    "React":            "Frontend",
    "Node.js":          "Backend",
    "FastAPI":          "Backend",
    "Flutter":          "Mobile",
    "SQL":              "Data",
    "Machine Learning": "AI/ML",
    "Deep Learning":    "AI/ML",
    "Data Analysis":    "Data",
    "Figma":            "Design",
    "UI Design":        "Design",
    "Graphic Design":   "Design",
    "Blender":          "3D/Art",
    "Video Editing":    "Creative",
    "Excel":            "Productivity",
    "Public Speaking":  "Soft Skills",
    "DevOps":           "Infrastructure",
}

SKILL_NAMES = list(SKILL_TAXONOMY.keys())
taxonomy_embeddings = model.encode(SKILL_NAMES, convert_to_tensor=True)

def normalise_skill(raw: str) -> dict:
    cleaned = re.sub(r"[^a-zA-Z0-9\s\+\#]", " ", raw).strip()
    emb = model.encode(cleaned, convert_to_tensor=True)
    scores = util.cos_sim(emb, taxonomy_embeddings)[0]
    best_idx = int(scores.argmax())
    confidence = round(float(scores[best_idx]), 4)
    if confidence > 0.75:
        skill_name = SKILL_NAMES[best_idx]
        return {
            "skill":      skill_name,
            "category":   SKILL_TAXONOMY[skill_name],
            "confidence": confidence,
            "matched":    True
        }
    return {
        "skill":      raw.strip().title(),
        "category":   "Other",
        "confidence": confidence,
        "matched":    False
    }

def normalise_skill_list(raw_skills: List[str]) -> List[dict]:
    return [normalise_skill(s) for s in raw_skills]

def extract_skills_from_text(text: str) -> List[dict]:
    text_emb = model.encode(text, convert_to_tensor=True)
    scores = util.cos_sim(text_emb, taxonomy_embeddings)[0]
    found = []
    for idx, score in enumerate(scores):
        if float(score) > 0.40:
            found.append({
                "skill":      SKILL_NAMES[idx],
                "category":   SKILL_TAXONOMY[SKILL_NAMES[idx]],
                "confidence": round(float(score), 4),
                "matched":    True
            })
    found.sort(key=lambda x: x["confidence"], reverse=True)
    return found[:5]

def get_skill_category(skill: str) -> str:
    return normalise_skill(skill)["category"]