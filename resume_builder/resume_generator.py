from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.units import cm
from reportlab.lib import colors
import io

def generate_resume_pdf(profile: dict) -> bytes:
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )

    styles = getSampleStyleSheet()
    name_style = ParagraphStyle(
        "Name", fontSize=20, fontName="Helvetica-Bold",
        textColor=colors.HexColor("#1a1a1a"), spaceAfter=4
    )
    heading_style = ParagraphStyle(
        "Heading", fontSize=12, fontName="Helvetica-Bold",
        textColor=colors.HexColor("#333333"), spaceBefore=12, spaceAfter=4
    )
    body_style = ParagraphStyle(
        "Body", fontSize=10, fontName="Helvetica",
        textColor=colors.HexColor("#444444"), spaceAfter=3, leading=14
    )
    contact_style = ParagraphStyle(
        "Contact", fontSize=10, fontName="Helvetica",
        textColor=colors.HexColor("#666666"), spaceAfter=2
    )

    story = []

    # Name
    name = profile.get("name", "Your Name")
    story.append(Paragraph(name, name_style))

    # Contact info
    email   = profile.get("email", "")
    phone   = profile.get("phone", "")
    college = profile.get("college", "")
    contact_parts = [x for x in [email, phone, college] if x]
    if contact_parts:
        story.append(Paragraph(" · ".join(contact_parts), contact_style))

    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#cccccc"), spaceAfter=8))

    # Skills
    skills = profile.get("skills_have", [])
    if skills:
        story.append(Paragraph("Skills", heading_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#eeeeee")))
        story.append(Spacer(1, 4))
        story.append(Paragraph(", ".join(skills), body_style))

    # Learning
    skills_want = profile.get("skills_want", [])
    if skills_want:
        story.append(Paragraph("Currently Learning", heading_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#eeeeee")))
        story.append(Spacer(1, 4))
        story.append(Paragraph(", ".join(skills_want), body_style))

    # Education
    story.append(Paragraph("Education", heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#eeeeee")))
    story.append(Spacer(1, 4))
    level_map = {
        "highschool": "High School",
        "undergrad_1": "Undergraduate — Year 1",
        "undergrad_2": "Undergraduate — Year 2",
        "undergrad_3": "Undergraduate — Year 3",
        "undergrad_4": "Undergraduate — Year 4",
        "postgrad": "Postgraduate",
        "phd": "PhD"
    }
    level = level_map.get(profile.get("level", ""), profile.get("level", ""))
    edu_text = f"{college} · {level}" if college else level
    story.append(Paragraph(edu_text, body_style))

    doc.build(story)
    buffer.seek(0)
    return buffer.read()