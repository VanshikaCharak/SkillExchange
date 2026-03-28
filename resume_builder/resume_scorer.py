def score_resume(parsed: dict) -> dict:
    score = 0
    feedback = []

    # Name (10 pts)
    if parsed.get("name") and parsed["name"] != "Unknown":
        score += 10
    else:
        feedback.append("Could not detect your name — make sure it's at the top.")

    # Email (10 pts)
    if parsed.get("email"):
        score += 10
    else:
        feedback.append("No email found — add your contact email.")

    # Phone (10 pts)
    if parsed.get("phone"):
        score += 10
    else:
        feedback.append("No phone number found.")

    # Skills (30 pts)
    skill_count = len(parsed.get("skills", []))
    if skill_count >= 8:
        score += 30
    elif skill_count >= 5:
        score += 20
        feedback.append("Add more skills — aim for at least 8.")
    elif skill_count >= 2:
        score += 10
        feedback.append("Very few skills detected — expand your skills section.")
    else:
        feedback.append("No recognisable skills found — add a dedicated skills section.")

    # Experience (25 pts)
    exp = parsed.get("experience", "")
    if len(exp) > 200:
        score += 25
    elif len(exp) > 50:
        score += 15
        feedback.append("Experience section is thin — add more detail to each role.")
    else:
        feedback.append("No experience section found — add work, internships, or projects.")

    # Education (15 pts)
    edu = parsed.get("education", "")
    if len(edu) > 30:
        score += 15
    else:
        feedback.append("No education section found.")

    # Grade
    if score >= 85:
        grade = "Excellent"
    elif score >= 70:
        grade = "Good"
    elif score >= 50:
        grade = "Average"
    else:
        grade = "Needs Work"

    return {
        "score":    score,
        "grade":    grade,
        "feedback": feedback,
        "breakdown": {
            "name":       10 if parsed.get("name") != "Unknown" else 0,
            "email":      10 if parsed.get("email") else 0,
            "phone":      10 if parsed.get("phone") else 0,
            "skills":     min(skill_count * 4, 30),
            "experience": 25 if len(exp) > 200 else (15 if len(exp) > 50 else 0),
            "education":  15 if len(edu) > 30 else 0,
        }
    }