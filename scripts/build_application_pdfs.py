from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf"
PUBLIC = ROOT / "public" / "docs"

# Yellow Ribbon Singapore & Selarang Halfway House palette
GOLD = HexColor("#F59E0B")
AMBER = HexColor("#D97706")
BRONZE = HexColor("#B45309")
CHAMPAGNE = HexColor("#FEF3C7")
CREAM = HexColor("#FFFDF5")
SLATE = HexColor("#0F172A")
NAVY_SOFT = HexColor("#1E293B")
INK = HexColor("#0C111D")
SOFT = HexColor("#475569")
WHITE = HexColor("#FFFFFF")
EMERALD = HexColor("#059669")


def page_decor(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(SLATE)
    canvas.rect(0, height - 19 * mm, width, 19 * mm, stroke=0, fill=1)
    canvas.setFillColor(GOLD)
    canvas.rect(0, height - 19.8 * mm, width, 0.8 * mm, stroke=0, fill=1)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(WHITE)
    canvas.drawString(18 * mm, height - 12 * mm, "JOHN TAN  /  CASE MANAGER  /  SELARANG HALFWAY HOUSE")
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(SOFT)
    canvas.drawString(18 * mm, 10 * mm, "Yellow Ribbon Industries · Singapore Prison Service Co-Management")
    canvas.drawRightString(width - 18 * mm, 10 * mm, f"{doc.page}")
    canvas.restoreState()


def document(path: Path):
    doc = BaseDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=28 * mm,
        bottomMargin=17 * mm,
        title=path.stem.replace("_", " "),
        author="John Tan",
        subject="Case Manager - Selarang Halfway House Application",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates(PageTemplate(id="application", frames=[frame], onPage=page_decor))
    return doc


base = getSampleStyleSheet()
styles = {
    "name": ParagraphStyle(
        "Name", parent=base["Title"], fontName="Helvetica-Bold", fontSize=28,
        leading=30, textColor=SLATE, alignment=TA_LEFT, spaceAfter=2.5 * mm,
    ),
    "headline": ParagraphStyle(
        "Headline", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=12,
        leading=16, textColor=AMBER, spaceAfter=3.5 * mm,
    ),
    "contact": ParagraphStyle(
        "Contact", parent=base["Normal"], fontName="Helvetica", fontSize=8.5,
        leading=12, textColor=SOFT, spaceAfter=5 * mm,
    ),
    "section": ParagraphStyle(
        "Section", parent=base["Heading2"], fontName="Helvetica-Bold", fontSize=9,
        leading=11, textColor=BRONZE, spaceBefore=4 * mm, spaceAfter=2.5 * mm,
        uppercase=True,
    ),
    "role": ParagraphStyle(
        "Role", parent=base["Heading3"], fontName="Helvetica-Bold", fontSize=10.5,
        leading=13, textColor=SLATE, spaceAfter=1 * mm,
    ),
    "meta": ParagraphStyle(
        "Meta", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=8,
        leading=10, textColor=AMBER, spaceAfter=1.5 * mm,
    ),
    "body": ParagraphStyle(
        "Body", parent=base["BodyText"], fontName="Helvetica", fontSize=8.5,
        leading=12.2, textColor=SOFT, spaceAfter=2.2 * mm,
    ),
    "bullet": ParagraphStyle(
        "Bullet", parent=base["BodyText"], fontName="Helvetica", fontSize=8.3,
        leading=11.7, leftIndent=4 * mm, firstLineIndent=-3 * mm, textColor=SOFT,
        bulletIndent=0, spaceAfter=1.2 * mm,
    ),
    "letter": ParagraphStyle(
        "Letter", parent=base["BodyText"], fontName="Helvetica", fontSize=9.3,
        leading=14.2, textColor=SOFT, spaceAfter=3.2 * mm,
    ),
    "letter_head": ParagraphStyle(
        "LetterHead", parent=base["Heading1"], fontName="Helvetica-Bold", fontSize=20,
        leading=23, textColor=SLATE, spaceAfter=2.5 * mm,
    ),
}


def p(text, style="body"):
    return Paragraph(text, styles[style])


def bullets(items):
    return [p(f"- {item}", "bullet") for item in items]


def build_resume(path: Path):
    story = [
        p("JOHN TAN", "name"),
        p("Guiding Reintegration with Empathy, Structure, and Purpose.", "headline"),
        p(
            "Singapore  |  +65 9889 1383  |  sxk2929@gmail.com  |  "
            '<a href="https://john-tan-presentation.vercel.app" '
            'color="#D97706">john-tan-presentation.vercel.app</a>', "contact"
        ),
        p("PROFESSIONAL SUMMARY", "section"),
        p(
            "Dedicated social-service practitioner currently pursuing the Graduate Diploma in Social Work "
            "at Singapore University of Social Sciences (SUSS), combining active community casework at NTUC Health "
            "with senior leadership in technology and regulated banking. Seeking to serve as Case Manager at "
            "Selarang Halfway House (Yellow Ribbon Industries), supporting the Senior/Assistant Director (Programme) "
            "and Lead Case Manager to deliver impactful rehabilitation, psychology-informed CBP programmes, "
            "job-site visits, and meticulous statutory case documentation."
        ),
        p("TARGET ROLE-FIT EVIDENCE & CORE COMPETENCIES", "section"),
    ]
    evidence = [
        ("Rehabilitation & CBP Group Work", "Facilitates psycho-social groups integrating motivational interviewing and cognitive-behavioural principles."),
        ("Holistic Casework & Assessment", "Conducts bio-psycho-social assessments, family needs mapping, and timely referrals to FSCs and community resources."),
        ("Employment Visits & Reintegration", "Conducts home/job-site visits, mediates workplace friction with employers, and monitors resident work stability."),
        ("SPS Co-Case Conferences", "Synthesizes objective resident progress reviews for case conferences with Singapore Prison Service (SPS) officers."),
        ("Statutory Documentation Discipline", "Honed across six years of software engineering at ST Engineering and regulated banking audits; zero log backlog."),
    ]
    table_data = []
    for title, proof in evidence:
        table_data.append([p(title, "role"), p(proof)])
    table = Table(table_data, colWidths=[52 * mm, 116 * mm], hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), CHAMPAGNE),
        ("BOX", (0, 0), (-1, -1), 0.5, HexColor("#CBD5E1")),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, HexColor("#E2E8F0")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    story.extend([table, p("EXPERIENCE", "section")])

    roles = [
        ("Programme Associate", "NTUC Health - Active Ageing Centre", "Jun 2026 - Present", [
            "Facilitate psycho-social group interventions and active engagement sessions, applying person-centred communication and motivational techniques.",
            "Conduct holistic client needs assessments, risk screenings, and referrals to family service centres, healthcare, and financial aid schemes.",
            "Coordinate community partners and volunteer instructors; maintain detailed attendance records and programme evaluation logs.",
        ]),
        ("Software Engineer (Generative AI)", "ST Engineering, Singapore", "Jan 2019 - Dec 2025", [
            "Delivered mission-critical enterprise systems requiring structured documentation, rigorous data governance, and strict statutory compliance.",
            "Authored audit-ready technical reports, tracked multi-stage project milestones, and maintained precise data logs under strict SLA standards.",
        ]),
        ("Director", "ABN AMRO Bank, Singapore", "2009 - 2018", [
            "Managed multi-stakeholder governance, high-consequence operations, and time-sensitive regulatory compliance in a strictly audited environment.",
            "Developed mature interpersonal judgement, crisis de-escalation capability, and inter-agency consensus building.",
        ]),
        ("Vice President", "Citibank, Singapore", "2003 - 2009", [
            "Led operational risk reviews, stakeholder communications, and team leadership with high accountability and integrity.",
        ]),
    ]
    for role, org, period, items in roles:
        story.append(KeepTogether([p(role, "role"), p(f"{org}  /  {period}", "meta"), *bullets(items)]))

    story.extend([
        PageBreak(),
        p("EDUCATION & QUALIFICATIONS", "section"),
        KeepTogether([
            p("Graduate Diploma in Social Work", "role"),
            p("Singapore University of Social Sciences (SUSS)  /  Currently enrolled", "meta"),
            p("Formal postgraduate social work study covering Direct Casework Practice, Group Work & Interventions, Social Policy, and Professional Ethics."),
        ]),
        KeepTogether([
            p("Diploma in Social Service", "role"),
            p("Hua Mei Training Academy, Tsao Foundation  /  Jan 2026 - Jun 2026", "meta"),
            p("Comprehensive preparation in bio-psycho-social assessments, counselling principles, and community casework."),
        ]),
        KeepTogether([
            p("Master of Business Administration (MBA)", "role"),
            p("Nanyang Technological University  /  2003  /  Dean's Honours List", "meta"),
        ]),
        KeepTogether([
            p("Bachelor of Science", "role"),
            p("National University of Singapore  /  1994  /  Public Service Commission Scholarship", "meta"),
        ]),
        p("CORE CAPABILITIES", "section"),
        p("Correctional Casework  /  Psychology-Informed CBP Interventions  /  Group Facilitation  /  Motivational Interviewing  /  "
          "Job-Site Visits & Employer Liaison  /  SPS Co-Case Conferences  /  Statutory Documentation  /  Trauma-Informed De-escalation  /  "
          "Electronic Case Records (ECMS)  /  Risk-Need-Responsivity (RNR) Framework"),
        p("SELARANG REINTEGRATION MODEL", "section"),
        p("<b>01 Intake & Assessment:</b> Multi-dimensional bio-psycho-social assessment and criminogenic risk review.<br/>"
          "<b>02 CBP Interventions:</b> Psychology-informed group programmes, relapse prevention, and cognitive reframing.<br/>"
          "<b>03 Employment & Housing:</b> Job-site visits, employer feedback follow-up, and accommodation verification.<br/>"
          "<b>04 SPS Co-Management:</b> Case discussions and formal conferences with Singapore Prison Service officers.<br/>"
          "<b>05 Community Re-entry:</b> Aftercare linkage, family reconciliation, and sustainable desistance."),
        p("YELLOW RIBBON COMMITMENT", "section"),
        p("Dedicated to Yellow Ribbon Singapore’s vision of Beyond Second Chances—restoring hope, self-worth, and dignity to residents while safeguarding community safety and statutory accountability."),
        p("LANGUAGES", "section"),
        p("English fluent; Mandarin and Cantonese conversational."),
    ])
    document(path).build(story)


def build_cover_letter(path: Path):
    story = [
        Spacer(1, 3 * mm),
        p("Application for Case Manager", "letter_head"),
        p("Selarang Halfway House | Yellow Ribbon Industries Pte. Ltd.", "headline"),
        p("John Tan  |  Singapore  |  +65 9889 1383  |  sxk2929@gmail.com", "contact"),
        Spacer(1, 2.5 * mm),
        p("Dear Senior/Assistant Director (Programme) and Lead Case Manager,", "letter"),
        p(
            "I am writing to express my strong commitment to join Selarang Halfway House as a Case Manager under "
            "Yellow Ribbon Industries. The mission to deliver meaningful rehabilitation and reintegration programmes "
            "for residents under the Community-Based Programme (CBP) represents the precise purpose and dedication "
            "driving my career transition into social service.", "letter"
        ),
        p(
            "I am currently pursuing the Graduate Diploma in Social Work at Singapore University of Social Sciences (SUSS), "
            "strengthening my theoretical, ethical, and clinical casework foundation in direct practice, group work interventions, "
            "and multi-disciplinary collaboration. This builds directly on my Diploma in Social Service from Hua Mei Training Academy, "
            "Tsao Foundation. Currently serving as a Programme Associate at NTUC Health Active Ageing Centre, I actively engage clients "
            "through holistic needs assessment, psycho-social group facilitation, volunteer coordination, and timely community referrals.", "letter"
        ),
        p(
            "The Selarang Halfway House Case Manager scope calls for a unique synthesis of empathy, field presence, and administrative rigour. "
            "My background is uniquely equipped for these responsibilities: "
            "<br/>- <b>Psychology-Informed Programmes & Group Work:</b> Experienced in group facilitation utilizing cognitive-behavioural and motivational interviewing concepts to support residents through behavioural change. "
            "<br/>- <b>Reintegration & Employer Engagement:</b> With senior corporate leadership experience at Citibank and ABN AMRO, I communicate with confidence and diplomacy with corporate and SME employers during job-site visits, mediating workplace friction to sustain employment. "
            "<br/>- <b>SPS Collaboration & Case Conferences:</b> Accustomed to multi-agency alignment and objective reporting, ensuring seamless co-case management with Singapore Prison Service (SPS) Reintegration Officers. "
            "<br/>- <b>Statutory Records & Reporting:</b> Six years of software engineering at ST Engineering embedded an uncompromising standard of data integrity, structured case notes, and timely statutory compliance.", "letter"
        ),
        p(
            "I resonate profoundly with the Yellow Ribbon philosophy of 'Beyond Second Chances'. I believe that every resident who enters "
            "Selarang Halfway House possesses the capacity for lasting transformation when provided with structured rehabilitation, "
            "genuine respect, and reliable follow-through. I am prepared to contribute with humility, high energy, and unwavering dependability.", "letter"
        ),
        p(
            "I would welcome the privilege of an interview to discuss how my SUSS social work training, ground community practice, and "
            "executive operating maturity can serve the residents, team, and mission of Selarang Halfway House.", "letter"
        ),
        Spacer(1, 2.5 * mm),
        p("Respectfully yours,", "letter"),
        p("<b>John Tan</b>", "letter"),
    ]
    document(path).build(story)


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    files = {
        "John_Tan_Resume_Case_Manager_Selarang_Halfway_House.pdf": build_resume,
        "John_Tan_Cover_Letter_Case_Manager_Selarang_Halfway_House.pdf": build_cover_letter,
        # Maintain aliases for existing paths if referenced
        "John_Tan_Resume_Assistant_Program_Facilitator.pdf": build_resume,
        "John_Tan_Cover_Letter_Assistant_Program_Facilitator.pdf": build_cover_letter,
    }
    for name, builder in files.items():
        output_path = OUTPUT / name
        builder(output_path)
        (PUBLIC / name).write_bytes(output_path.read_bytes())
        print(f"created {output_path}")


if __name__ == "__main__":
    main()
