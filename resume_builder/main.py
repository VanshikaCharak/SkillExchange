from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel
from typing import List
from resume_parser import extract_text_from_pdf, parse_resume
from resume_scorer import score_resume
from resume_generator import generate_resume_pdf

app = FastAPI(title="Resume Builder API")

# ── parse + score uploaded PDF ──────────────────────────────────

@app.get("/")
def root():
    return {"status": "Resume Builder API is running"}

@app.post("/resume/parse")
async def parse(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files accepted")
    contents = await file.read()
    text   = extract_text_from_pdf(contents)
    parsed = parse_resume(text)
    return parsed

@app.post("/resume/score")
async def score(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files accepted")
    contents = await file.read()
    text   = extract_text_from_pdf(contents)
    parsed = parse_resume(text)
    result = score_resume(parsed)
    return result

@app.post("/resume/parse-and-score")
async def parse_and_score(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files accepted")
    contents = await file.read()
    text   = extract_text_from_pdf(contents)
    parsed = parse_resume(text)
    scored = score_resume(parsed)
    return {"parsed": parsed, "score": scored}

# ── generate PDF from skill profile ────────────────────────────

class ProfileInput(BaseModel):
    name: str
    email: str = ""
    phone: str = ""
    college: str = ""
    level: str = ""
    skills_have: List[str] = []
    skills_want: List[str] = []

@app.post("/resume/generate")
def generate(profile: ProfileInput):
    pdf_bytes = generate_resume_pdf(profile.dict())
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=resume.pdf"}
    )

# ── premium: tailor to job description (stub) ──────────────────

@app.post("/resume/tailor")
def tailor_to_jd():
    raise HTTPException(
        status_code=403,
        detail="This is a premium feature. Upgrade your plan to unlock JD tailoring."
    )