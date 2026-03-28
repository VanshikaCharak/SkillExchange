from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from skill_nlp import (
    normalise_skill,
    normalise_skill_list,
    extract_skills_from_text,
    get_skill_category
)

app = FastAPI(title="Skill NLP API")

class SkillInput(BaseModel):
    skill: str

class SkillListInput(BaseModel):
    skills: List[str]

class TextInput(BaseModel):
    text: str

@app.get("/")
def root():
    return {"status": "Skill NLP API is running"}

@app.post("/skills/normalise")
def normalise_one(body: SkillInput):
    return normalise_skill(body.skill)

@app.post("/skills/normalise-list")
def normalise_list(body: SkillListInput):
    return {"results": normalise_skill_list(body.skills)}

@app.post("/skills/extract")
def extract_from_text(body: TextInput):
    return {"skills": extract_skills_from_text(body.text)}

@app.get("/skills/category/{skill}")
def skill_category(skill: str):
    return {"skill": skill, "category": get_skill_category(skill)}