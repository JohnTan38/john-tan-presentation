#!/usr/bin/env python3
"""
Cover letter (tight, formal) for: Associate (Programme), Active Ageing Centre — Care Corner.
Matching letterhead / brand to the resume. Edit CFG + body, re-run to regenerate.
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, HRFlowable, Image)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
import os

CFG = {
    "name": "JOHN TAN",
    "name_sign": "John Tan",
    "target_role": "Associate (Programme)  |  Active Ageing Centre",
    "email": "sxk2929@gmail.com",
    "phone": "+65 9889 1383",
    "location": "Singapore",
    "portfolio": "john-tan-presentation.vercel.app",
    "portfolio_url": "https://john-tan-presentation.vercel.app",
    "date": "8 July 2026",              # <-- update on the day you send
    "logo": "cc_logo.png",
    "out": "John_Tan_CoverLetter_CareCorner_Associate_Programme.pdf",
}

NAVY = colors.HexColor("#14284B")
CRIMSON = colors.HexColor("#C8102E")
INK = colors.HexColor("#23272E")
GREY = colors.HexColor("#5B6470")

ss = getSampleStyleSheet()
st_name = ParagraphStyle("name", parent=ss["Normal"], fontName="Helvetica-Bold",
                         fontSize=21, leading=23, textColor=NAVY, spaceAfter=1)
st_role = ParagraphStyle("role", parent=ss["Normal"], fontName="Helvetica-Bold",
                         fontSize=10.5, leading=13, textColor=CRIMSON, spaceBefore=1)
st_contact = ParagraphStyle("contact", parent=ss["Normal"], fontName="Helvetica",
                            fontSize=8.6, leading=12, textColor=GREY)
st_meta = ParagraphStyle("meta", parent=ss["Normal"], fontName="Helvetica",
                         fontSize=9.6, leading=13.5, textColor=INK)
st_re = ParagraphStyle("re", parent=ss["Normal"], fontName="Helvetica-Bold",
                       fontSize=9.8, leading=14, textColor=NAVY)
st_body = ParagraphStyle("body", parent=ss["Normal"], fontName="Helvetica",
                         fontSize=9.9, leading=14.4, textColor=INK,
                         alignment=TA_JUSTIFY, spaceAfter=8)

story = []
# --- Letterhead (matches resume) ---
left = [Paragraph(CFG["name"], st_name), Paragraph(CFG["target_role"], st_role)]
logo_cell = ""
if os.path.exists(CFG["logo"]):
    img = Image(CFG["logo"], width=1.55 * cm, height=1.55 * cm); img.hAlign = "RIGHT"
    logo_cell = img
head = Table([[left, logo_cell]], colWidths=[13.9 * cm, 3.4 * cm])
head.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("ALIGN", (1, 0), (1, 0), "RIGHT"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
story.append(head)
story.append(Spacer(1, 4))
story.append(HRFlowable(width="100%", thickness=1.6, color=CRIMSON, spaceAfter=4))
story.append(Paragraph(
    f'{CFG["email"]}  &nbsp;•&nbsp;  {CFG["phone"]}  &nbsp;•&nbsp;  {CFG["location"]}  &nbsp;•&nbsp;  '
    f'<a href="{CFG["portfolio_url"]}" color="#14284B">{CFG["portfolio"]}</a>', st_contact))
story.append(Spacer(1, 16))

# --- Date + recipient ---
story.append(Paragraph(CFG["date"], st_meta))
story.append(Spacer(1, 10))
story.append(Paragraph("Hiring Manager", st_meta))
story.append(Paragraph("Care Corner Singapore \u2014 Active Ageing Centre", st_meta))
story.append(Paragraph("Singapore", st_meta))
story.append(Spacer(1, 12))
story.append(Paragraph(
    "Re: Application for Associate (Programme), Active Ageing Centre", st_re))
story.append(Spacer(1, 10))
story.append(Paragraph("Dear Hiring Manager,", st_body))

# --- Body ---
paras = [
    "I am writing to apply for the Associate (Programme) position at your Active Ageing Centre. "
    "After two decades in banking and technology, I have made a deliberate transition into social "
    "service, and am currently pursuing a Diploma in Social Service while interning at an NTUC Health "
    "Active Ageing Centre. Care Corner\u2019s mission to build caring, inclusive communities reflects "
    "exactly the work to which I have chosen to dedicate the next chapter of my career.",

    "At the NTUC Health AAC, I plan and facilitate daily activities across the five Active Ageing "
    "Programme domains \u2014 Physical, Intellectual, Emotional, Social, and Vocational. I coordinate with "
    "community partners such as NHG, HPB, RN, and ICCP to co-deliver wellness workshops; recruit and "
    "onboard specialist volunteer instructors; and support outreach to isolated and vulnerable seniors. "
    "I also conceptualised a new in-centre caf\u00e9 concept for a membership campaign, preparing the "
    "proposal and collateral that secured management buy-in. This hands-on experience has given me a "
    "practical understanding of what it takes to run a vibrant centre and engage seniors with warmth and "
    "consistency.",

    "My earlier career provides a foundation I believe would serve the role well. As a Director and Vice "
    "President in banking, and later as a software engineer, I developed strengths in stakeholder "
    "management, operations, documentation, and reporting \u2014 capabilities that translate directly to "
    "programme coordination, attendance tracking, and centre administration. I am fluent in English and "
    "Mandarin, with conversational Cantonese, allowing me to connect with seniors across dialect groups.",

    "I would welcome the opportunity to contribute to Care Corner\u2019s Active Ageing Centre and to the "
    "seniors it serves. Thank you for considering my application; I would be glad to discuss how my "
    "experience and commitment can support your team.",
]
for p in paras:
    story.append(Paragraph(p, st_body))

story.append(Spacer(1, 6))
story.append(Paragraph("Yours sincerely,", st_body))
story.append(Spacer(1, 4))
story.append(Paragraph(f'<b>{CFG["name_sign"]}</b>', st_meta))

doc = SimpleDocTemplate(
    CFG["out"], pagesize=A4, leftMargin=1.9 * cm, rightMargin=1.9 * cm,
    topMargin=1.3 * cm, bottomMargin=1.3 * cm,
    title=f'{CFG["name_sign"]} — Cover Letter (Care Corner Associate, Programme)',
    author=CFG["name_sign"])
doc.build(story)
print("Wrote", CFG["out"])
