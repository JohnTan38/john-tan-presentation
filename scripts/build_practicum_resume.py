"""Build John Tan's SWK512 practicum resume in the harbour-navy house style.

Run: python scripts/build_practicum_resume.py
Writes output/pdf/<name> and copies it to public/docs/<name>.
"""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import BaseDocTemplate, Frame, KeepTogether, PageTemplate, Paragraph, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf"
PUBLIC = ROOT / "public" / "docs"
NAME = "John_Tan_Resume_SWK512_Practicum.pdf"
SITE = "https://john-tan-profile.vercel.app"
PHOTO = ROOT / "scripts" / "assets" / "john-tan-photo.jpg"

NAVY = HexColor("#0F2A47")
NAVY_DEEP = HexColor("#0B1F36")
NAVY_SOFT = HexColor("#B9C7D6")
TEAL = HexColor("#2E7A73")
TEAL_DARK = HexColor("#215B56")
MARIGOLD = HexColor("#E0A23A")
PAPER = HexColor("#F4F6F3")
LINE = HexColor("#D5DCE2")
INK = HexColor("#142233")
SOFT = HexColor("#4A5A6B")
WHITE = HexColor("#FFFFFF")

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm
BAND = 46 * mm


def first_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, PAGE_H - BAND, PAGE_W, BAND, stroke=0, fill=1)
    # Profile photo, framed on the right of the header band
    photo_w, photo_h = 30 * mm, 35 * mm
    photo_x = PAGE_W - MARGIN - photo_w
    photo_y = PAGE_H - BAND + (BAND - photo_h) / 2
    canvas.setFillColor(MARIGOLD)
    canvas.roundRect(photo_x - 0.8 * mm, photo_y - 0.8 * mm, photo_w + 1.6 * mm, photo_h + 1.6 * mm, 2.2 * mm, stroke=0, fill=1)
    clip = canvas.beginPath()
    clip.roundRect(photo_x, photo_y, photo_w, photo_h, 1.8 * mm)
    canvas.saveState()
    canvas.clipPath(clip, stroke=0, fill=0)
    canvas.drawImage(str(PHOTO), photo_x, photo_y, photo_w, photo_h)
    canvas.restoreState()

    # 40 week bars: the practicum hours motif from the profile site
    colours = [HexColor("#6F90B5")] * 8 + [HexColor("#3F9A90")] * 12 + [MARIGOLD] * 13 + [HexColor("#C9D4DE")] * 7
    bar_w, gap = 0.9 * mm, 0.36 * mm
    bars_right = photo_x - 6 * mm
    x0 = bars_right - 40 * bar_w - 39 * gap
    for i, colour in enumerate(colours):
        canvas.setFillColor(colour)
        canvas.roundRect(x0 + i * (bar_w + gap), PAGE_H - 24 * mm, bar_w, 12 * mm, 0.35 * mm, stroke=0, fill=1)
    canvas.setFont("Helvetica", 7.2)
    canvas.setFillColor(NAVY_SOFT)
    canvas.drawRightString(bars_right, PAGE_H - 27.6 * mm, "400 practicum hours, 11 Jan to 15 Oct 2027")

    canvas.setFillColor(WHITE)
    canvas.setFont("Times-Roman", 30)
    canvas.drawString(MARGIN, PAGE_H - 21 * mm, "John Tan")
    canvas.setFont("Helvetica", 10.5)
    canvas.setFillColor(HexColor("#DFE7EF"))
    canvas.drawString(MARGIN, PAGE_H - 29 * mm, "Social work practicum candidate, SUSS SWK512")
    canvas.setFont("Helvetica", 8.4)
    canvas.setFillColor(NAVY_SOFT)
    contact = "Singapore  |  +65 9889 1383  |  sxk2929@gmail.com  |  john-tan-profile.vercel.app"
    canvas.drawString(MARGIN, PAGE_H - 37 * mm, contact)
    link_x = MARGIN + canvas.stringWidth(contact.rsplit("|", 1)[0] + "|  ", "Helvetica", 8.4)
    canvas.linkURL(SITE, (link_x, PAGE_H - 38.5 * mm, MARGIN + canvas.stringWidth(contact, "Helvetica", 8.4), PAGE_H - 34.5 * mm), relative=0)
    footer(canvas, doc)
    canvas.restoreState()


def later_pages(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, PAGE_H - 12 * mm, PAGE_W, 12 * mm, stroke=0, fill=1)
    canvas.setFillColor(MARIGOLD)
    canvas.rect(0, PAGE_H - 12.6 * mm, PAGE_W, 0.6 * mm, stroke=0, fill=1)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(WHITE)
    canvas.drawString(MARGIN, PAGE_H - 7.6 * mm, "John Tan  |  SWK512 practicum resume")
    footer(canvas, doc)
    canvas.restoreState()


def footer(canvas, doc):
    canvas.setFont("Helvetica", 7.2)
    canvas.setFillColor(SOFT)
    canvas.drawString(MARGIN, 10 * mm, "Graduate Diploma in Social Work student, Singapore University of Social Sciences (SUSS)")
    canvas.drawRightString(PAGE_W - MARGIN, 10 * mm, f"Page {doc.page}")


S = {
    "section": ParagraphStyle("section", fontName="Times-Roman", fontSize=14, leading=17, textColor=NAVY, spaceBefore=5 * mm, spaceAfter=2.4 * mm),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9, leading=13.2, textColor=INK, spaceAfter=2 * mm),
    "soft": ParagraphStyle("soft", fontName="Helvetica", fontSize=8.6, leading=12.4, textColor=SOFT),
    "role": ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=9.6, leading=12.5, textColor=NAVY),
    "meta": ParagraphStyle("meta", fontName="Helvetica", fontSize=8.3, leading=11, textColor=TEAL_DARK, spaceAfter=1.2 * mm),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=8.7, leading=12.4, textColor=SOFT, leftIndent=4 * mm, bulletIndent=0.5 * mm, spaceAfter=0.9 * mm),
    "cell_head": ParagraphStyle("cell_head", fontName="Helvetica-Bold", fontSize=8.6, leading=11.2, textColor=NAVY),
    "cell": ParagraphStyle("cell", fontName="Helvetica", fontSize=8.4, leading=11.6, textColor=SOFT),
    "num": ParagraphStyle("num", fontName="Times-Roman", fontSize=15, leading=16, textColor=TEAL),
}


def p(text, style="body"):
    return Paragraph(text, S[style])


def bullets(items):
    return [Paragraph(item, S["bullet"], bulletText="•") for item in items]


def role_block(role, org, period, items):
    return KeepTogether([p(role, "role"), p(f"{org}, {period}", "meta"), *bullets(items), Spacer(1, 1.5 * mm)])


COMPETENCIES = [
    ("Ethical and professional behaviour", "Explain practice decisions against the Code of Professional Ethics and agency policy; examine my own values in supervision."),
    ("Applying knowledge and skills with client systems", "Engage, assess, intervene and terminate with a supervised caseload, using a person-in-environment view."),
    ("Organisation, service delivery and change", "Map the agency's structure, funding, service pathway and partners; propose one improvement."),
    ("Evaluating practice", "Measure progress with goal attainment scaling and programme feedback, and adjust practice from it."),
    ("Practice-informed research and research-informed practice", "Ground assessments and interventions in current literature and Singapore data."),
    ("Policy practice and programme planning", "Analyse one national scheme affecting clients; plan, run and evaluate a programme activity."),
]


def competency_table():
    rows = [[p(str(i), "num"), p(title, "cell_head"), p(text, "cell")] for i, (title, text) in enumerate(COMPETENCIES, start=1)]
    table = Table(rows, colWidths=[9 * mm, 52 * mm, PAGE_W - 2 * MARGIN - 61 * mm], hAlign="LEFT")
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
        ("LINEABOVE", (0, 0), (-1, 0), 0.4, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 3),
    ]))
    return table


def plan_table():
    phases = [
        ("Hours 1-80", "Orientation and learning contract", "Agency orientation; learning contract agreed with Field Educator at about 80 hours"),
        ("Hours 81-200", "Assessment and direct practice", "Supervised caseload, assessments, process recording; mid-practicum evaluation at 180-200 hours"),
        ("Hours 201-330", "Intervention, groups and programmes", "Evidence brief, ethical dilemma analysis, group or programme evaluation, policy brief"),
        ("Hours 331-400", "Evaluation and termination", "Case study, final evaluation, confirmation of hours, portfolio submission"),
    ]
    rows = [[p(w, "meta"), p(t, "cell_head"), p(d, "cell")] for w, t, d in phases]
    table = Table(rows, colWidths=[24 * mm, 50 * mm, PAGE_W - 2 * MARGIN - 74 * mm], hAlign="LEFT")
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (-1, -1), PAPER),
        ("LINEBELOW", (0, 0), (-1, -2), 0.4, LINE),
        ("LINEBEFORE", (0, 0), (0, -1), 2, MARIGOLD),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
    ]))
    return table


def build(path: Path):
    doc = BaseDocTemplate(
        str(path), pagesize=A4, leftMargin=MARGIN, rightMargin=MARGIN, topMargin=20 * mm, bottomMargin=17 * mm,
        title="John Tan - SWK512 Practicum Resume", author="John Tan", subject="SUSS SWK512 Social Work Practicum and Field Seminar",
    )
    first = Frame(MARGIN, doc.bottomMargin, doc.width, PAGE_H - BAND - 7 * mm - doc.bottomMargin, id="first")
    later = Frame(MARGIN, doc.bottomMargin, doc.width, doc.height, id="later")
    doc.addPageTemplates([
        PageTemplate(id="First", frames=[first], onPage=first_page, autoNextPageTemplate="Later"),
        PageTemplate(id="Later", frames=[later], onPage=later_pages),
    ])

    story = [
        p("Profile", "section"),
        p(
            "Graduate Diploma in Social Work student at Singapore University of Social Sciences (SUSS), seeking a 400-hour "
            "placement for SWK512 Social Work Practicum and Field Seminar. I work at an Active Ageing Centre and am moving into "
            "social service after careers in technology and banking. I want a placement where I can practise casework and group "
            "work under close supervision, and I am open to any practice setting."
        ),
        p("Practicum learning objectives", "section"),
        competency_table(),
        Spacer(1, 2 * mm),
        p("Full learning plan, assignment schedule, evaluation and supervision plans: "
          f'<a href="{SITE}" color="#215B56"><u>john-tan-profile.vercel.app</u></a>', "soft"),
        p("Social service experience", "section"),
        role_block("Programme Associate", "NTUC Health, Active Ageing Centre", "Jun 2026 to present", [
            "Facilitate group and active-ageing activities for seniors, using person-centred communication.",
            "Carry out client needs screening and make referrals to family service centres, healthcare and financial assistance schemes.",
            "Coordinate community partners and volunteer instructors; keep attendance records and programme evaluation logs.",
        ]),
        p("Earlier career", "section"),
        role_block("Software Engineer (Generative AI)", "ST Engineering, Singapore", "2019 to 2025", [
            "Built enterprise systems with structured documentation, data governance and audit-ready reporting.",
        ]),
        role_block("Director", "ABN AMRO Bank, Singapore", "2009 to 2018", [
            "Led governance and regulatory compliance work involving many stakeholders under tight deadlines.",
        ]),
        role_block("Vice President", "Citibank, Singapore", "2003 to 2009", [
            "Led operational risk reviews, stakeholder communication and teams.",
        ]),
        p("Education", "section"),
        role_block("Graduate Diploma in Social Work", "Singapore University of Social Sciences (SUSS)", "currently enrolled", [
            "Casework, group work, social policy, human behaviour in the social environment and professional ethics.",
        ]),
        role_block("Diploma in Social Service", "Hua Mei Training Academy, Tsao Foundation", "Jan to Jun 2026", [
            "Bio-psycho-social assessment, counselling principles and community casework.",
        ]),
        role_block("Master of Business Administration", "Nanyang Technological University", "2003, Dean's Honours List", []),
        role_block("Bachelor of Science", "National University of Singapore", "1994, Public Service Commission Scholarship", []),
        p("Proposed 400-hour plan", "section"),
        p("365 work hours, 20 supervision hours and 15 field seminar hours within the practicum period of 11 January to "
          "15 October 2027, at about 10 hours a week. Milestones are set by hours clocked.", "soft"),
        Spacer(1, 1.5 * mm),
        plan_table(),
        p("Supervision commitment", "section"),
        *bullets([
            "Fortnightly individual supervision of about one hour (at least 20 hours in total), with agenda, reflection journal and recordings sent a day ahead.",
            "Weekly log of work, supervision and seminar hours; learning contract reviewed at mid-practicum.",
            "Attendance at all five SUSS field seminars; I will arrange the mid-practicum meeting with the Practice Educator.",
        ]),
        p("Skills and languages", "section"),
        p("Group facilitation; needs screening and referral; partner and volunteer coordination; report writing and documentation; "
          "data and research literacy; APA referencing."),
        p("English (fluent), Mandarin and Cantonese (conversational). Referees available on request."),
    ]
    doc.build(story)


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    out = OUTPUT / NAME
    build(out)
    (PUBLIC / NAME).write_bytes(out.read_bytes())
    print(f"created {out}")


if __name__ == "__main__":
    main()
