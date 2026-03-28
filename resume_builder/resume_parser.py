import fitz  # pymupdf
import re
from typing import List

def extract_text_from_pdf(file_bytes: bytes) -> str:
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    full_text = ""
    for page in doc:
        full_text += page.get_text()
    return full_text.strip()

def parse_resume(text: str) -> dict:
    lines = [l.strip() for l in text.splitlines() if l.strip()]

    name    = extract_name(lines)
    email   = extract_email(text)
    phone   = extract_phone(text)
    skills  = extract_skills(text)
    exp     = extract_section(text, ["experience", "work experience", "employment"])
    edu     = extract_section(text, ["education", "qualifications"])

    return {
        "name":       name,
        "email":      email,
        "phone":      phone,
        "skills":     skills,
        "experience": exp,
        "education":  edu,
        "raw_text":   text
    }

def extract_name(lines: List[str]) -> str:
    # First non-empty line is usually the name
    for line in lines[:5]:
        if len(line.split()) >= 2 and len(line) < 50:
            return line
    return "Unknown"

def extract_email(text: str) -> str:
    match = re.search(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", text)
    return match.group(0) if match else ""

def extract_phone(text: str) -> str:
    match = re.search(r"(\+?\d[\d\s\-]{8,13}\d)", text)
    return match.group(0).strip() if match else ""

def extract_skills(text: str) -> List[str]:
    COMMON_SKILLS = [
        "Python", "JavaScript", "React", "Node.js", "SQL", "Machine Learning",
        "Deep Learning", "Figma", "FastAPI", "Flutter", "Java", "C++",
        "Data Analysis", "DevOps", "Excel", "Public Speaking", "UI Design",
        "Graphic Design", "Blender", "Video Editing", "Docker", "Git",
        "TypeScript", "MongoDB", "PostgreSQL", "AWS", "GCP", "Azure"
    ]
    found = []
    text_lower = text.lower()
    for skill in COMMON_SKILLS:
        if skill.lower() in text_lower:
            found.append(skill)
    return found

def extract_section(text: str, keywords: List[str]) -> str:
    lines = text.splitlines()
    capturing = False
    section_lines = []

    for line in lines:
        line_lower = line.lower().strip()
        if any(kw in line_lower for kw in keywords):
            capturing = True
            continue
        if capturing:
            # Stop at next section heading (short ALL CAPS or known heading)
            if line.isupper() and len(line) > 3:
                break
            if any(kw in line_lower for kw in [
                "education", "skills", "projects", "certifications",
                "experience", "summary", "objective"
            ]) and line_lower not in keywords:
                break
            section_lines.append(line)

    return "\n".join(section_lines).strip()