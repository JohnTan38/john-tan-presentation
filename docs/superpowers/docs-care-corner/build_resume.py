#!/usr/bin/env python3
"""
ATS-optimized resume for: Associate (Programme), Active Ageing Centre — Care Corner
Format: career-change hybrid (social service leads, tech reframed as transferable skills)
Single-column, real selectable text, A4 (Singapore). Care Corner navy + crimson brand.
Edit the CONFIG block, then re-run to regenerate.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, Image, KeepTogether, ListFlowable, ListItem
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
import os

# ------------------------------------------------------------------ #
#  CONFIG  —  EDIT THESE FIELDS (placeholders shown in [ ] / XXXX)    #
# ------------------------------------------------------------------ #
CFG = {
    "name": "JOHN TAN",
    "target_role": "Associate (Programme)  |  Active Ageing Centre",
    "email": "sxk2929@gmail.com",
    "phone": "+65 9889 1383",
    "location": "Singapore",
    "portfolio": "john-tan-presentation.vercel.app",
    "portfolio_url": "https://john-tan-presentation.vercel.app",
    "linkedin": "",
    "linkedin_url": "",
    "logo": "cc_logo.png",
    "out": "John_Tan_Resume_CareCorner_Associate_Programme.pdf",
}

# Brand colours (Care Corner)
NAVY   = colors.HexColor("#14284B")
CRIMSON= colors.HexColor("#C8102E")
INK    = colors.HexColor("#23272E")
GREY   = colors.HexColor("#5B6470")
LIGHT  = colors.HexColor("#D8DCE3")

# ------------------------------------------------------------------ #
#  STYLES                                                            #
# ------------------------------------------------------------------ #
ss = getSampleStyleSheet()

st_name = ParagraphStyle("name", parent=ss["Normal"], fontName="Helvetica-Bold",
                         fontSize=21, leading=23, textColor=NAVY, spaceAfter=1)
st_role = ParagraphStyle("role", parent=ss["Normal"], fontName="Helvetica-Bold",
                         fontSize=10.5, leading=13, textColor=CRIMSON, spaceBefore=1)
st_contact = ParagraphStyle("contact", parent=ss["Normal"], fontName="Helvetica",
                            fontSize=8.6, leading=12, textColor=GREY, alignment=TA_LEFT)
st_h = ParagraphStyle("h", parent=ss["Normal"], fontName="Helvetica-Bold",
                      fontSize=10.5, leading=13, textColor=NAVY, spaceBefore=3,
                      spaceAfter=2, tracking=0.5)
st_body = ParagraphStyle("body", parent=ss["Normal"], fontName="Helvetica",
                         fontSize=9.3, leading=12.3, textColor=INK, alignment=TA_JUSTIFY,
                         spaceAfter=1)
st_comp = ParagraphStyle("comp", parent=ss["Normal"], fontName="Helvetica",
                         fontSize=9.2, leading=12.6, textColor=INK)
st_role_title = ParagraphStyle("rt", parent=ss["Normal"], fontName="Helvetica-Bold",
                               fontSize=9.9, leading=12.5, textColor=INK)
st_org_meta = ParagraphStyle("om", parent=ss["Normal"], fontName="Helvetica-Oblique",
                             fontSize=8.8, leading=11.5, textColor=GREY)
st_date = ParagraphStyle("date", parent=ss["Normal"], fontName="Helvetica-Bold",
                         fontSize=8.8, leading=11.5, textColor=NAVY, alignment=2)  # right
st_bullet = ParagraphStyle("bullet", parent=ss["Normal"], fontName="Helvetica",
                           fontSize=9.2, leading=12.4, textColor=INK, alignment=TA_JUSTIFY)
st_edu = ParagraphStyle("edu", parent=ss["Normal"], fontName="Helvetica",
                        fontSize=9.3, leading=13, textColor=INK)


def section(title):
    """Navy heading + thin light rule."""
    return [
        Paragraph(title.upper(), st_h),
        HRFlowable(width="100%", thickness=0.8, color=LIGHT,
                   spaceBefore=1, spaceAfter=2.5),
    ]


def role_block(title, org_meta, date, bullets):
    """One experience entry: title/date row, org line, bullets."""
    header = Table(
        [[Paragraph(title, st_role_title), Paragraph(date, st_date)]],
        colWidths=[12.3 * cm, 5.0 * cm],
    )
    header.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    items = [
        ListItem(Paragraph(b, st_bullet), leftIndent=10, value="•", spaceBefore=1.2)
        for b in bullets
    ]
    lst = ListFlowable(items, bulletType="bullet", bulletColor=CRIMSON,
                       bulletFontSize=7, leftIndent=12, bulletOffsetY=0)
    return KeepTogether([header, Paragraph(org_meta, st_org_meta), Spacer(1, 2), lst,
                         Spacer(1, 1)])


# ------------------------------------------------------------------ #
#  BUILD STORY                                                       #
# ------------------------------------------------------------------ #
story = []

# --- Header: name/role (left)  +  logo (right) ---
left = [Paragraph(CFG["name"], st_name), Paragraph(CFG["target_role"], st_role)]
logo_cell = ""
if os.path.exists(CFG["logo"]):
    img = Image(CFG["logo"], width=1.55 * cm, height=1.55 * cm)
    img.hAlign = "RIGHT"
    logo_cell = img

head = Table([[left, logo_cell]], colWidths=[13.9 * cm, 3.4 * cm])
head.setStyle(TableStyle([
    ("VALIGN", (0, 0), (0, 0), "MIDDLE"),
    ("VALIGN", (1, 0), (1, 0), "MIDDLE"),
    ("ALIGN", (1, 0), (1, 0), "RIGHT"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ("TOPPADDING", (0, 0), (-1, -1), 0),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
]))
story.append(head)
story.append(Spacer(1, 3))
story.append(HRFlowable(width="100%", thickness=1.6, color=CRIMSON, spaceAfter=3))

# --- Contact line ---
contact_bits = [
    CFG["email"], CFG["phone"], CFG["location"],
    f'<a href="{CFG["portfolio_url"]}" color="#14284B">{CFG["portfolio"]}</a>',
]
if CFG.get("linkedin"):
    contact_bits.append(
        f'<a href="{CFG["linkedin_url"]}" color="#14284B">{CFG["linkedin"]}</a>')
story.append(Paragraph("  &nbsp;•&nbsp;  ".join(contact_bits), st_contact))

# --- Professional Summary ---
story += section("Professional Summary")
summary = (
    "Purpose-driven professional who has made a <b>deliberate career transition into social service</b> \u2014 "
    "now pursuing a <b>Diploma in Social Service</b> while interning hands-on at an <b>NTUC Health Active "
    "Ageing Centre (AAC)</b>. Plans and delivers senior wellness programmes across all five Active Ageing "
    "Programme (AAP) domains \u2014 Physical, Intellectual, Emotional, Social, and Vocational \u2014 and coordinates "
    "volunteers, community partners, and centre operations. Brings two decades of leadership, "
    "stakeholder-management, and operational experience from banking and technology, now channelled into "
    "building vibrant, inclusive communities where seniors thrive."
)
story.append(Paragraph(summary, st_body))

# --- Core Competencies ---
story += section("Core Competencies")
comps = [
    "Active Ageing Programme (AAP) Delivery", "Senior Engagement &amp; Rapport-Building",
    "Community Outreach &amp; Door-Knocking", "Support for Isolated / Vulnerable Seniors",
    "Volunteer Recruitment &amp; Coordination", "Community-Partner &amp; Stakeholder Engagement",
    "Attendance Records &amp; Activity Reporting", "Centre Operations &amp; Logistics",
    "Microsoft Office (Word, Excel, PowerPoint)",
]
story.append(Paragraph(
    ('&nbsp;&nbsp;<font color="#C8102E">|</font>&nbsp;&nbsp;').join(comps), st_comp))

# --- Relevant Experience ---
story += section("Relevant Experience")
story.append(role_block(
    "Programme Intern (Social Service)",
    "NTUC Health \u2014 Active Ageing Centre (Bishan)  |  Singapore",
    "2026 \u2013 Present",
    [
        "Planned and facilitated daily senior activities aligned with the <b>CASHEW</b> wellness framework, "
        "mapping directly to the Active Ageing Programme's <b>Physical, Intellectual, Emotional, Social, and "
        "Vocational</b> domains.",
        "Coordinated with community partners and stakeholders \u2014 including <b>NHG, HPB, RN, and ICCP</b> \u2014 "
        "to co-deliver localised wellness workshops and outreach for seniors.",
        "Recruited and onboarded specialist volunteer instructors (Arts &amp; Crafts, Drum-Fit) to diversify "
        "and expand the weekly activity calendar.",
        "Conceptualised a new in-centre caf\u00e9 concept for a membership-recruitment campaign \u2014 designing the "
        "pitch deck and menu collateral that secured management buy-in and strengthened centre outreach.",
        "Supported day-to-day centre operations, activity set-up, <b>attendance tracking</b>, and documentation "
        "to ensure accurate records for reporting.",
    ],
))

# --- Professional Experience (Transferable Skills) ---
story += section("Professional Experience \u2014 Transferable Skills")
story.append(role_block(
    "Software Engineer",
    "ST Engineering  |  Singapore",
    "Jan 2019 \u2013 Dec 2025",
    [
        "Delivered data, analytics, and engineering solutions within a large, structured organisation \u2014 "
        "translating stakeholder needs into practical tools and reports, directly transferable to programme "
        "attendance analytics, activity tracking, and centre reporting.",
        "Coordinated across cross-functional teams to deliver projects on schedule, applying the planning and "
        "follow-through that keep daily centre operations running smoothly.",
    ],
))
story.append(role_block(
    "Banking &amp; Financial Services",
    "Director, ABN AMRO Bank (2009\u201318)&nbsp;&nbsp;\u00b7&nbsp;&nbsp;"
    "Vice President, Citibank (2003\u201309)  |  Singapore",
    "2003 \u2013 2018",
    [
        "Built 15 years of experience across client service, operations, and stakeholder management in "
        "fast-paced banking environments \u2014 developing the interpersonal warmth, process rigour, and "
        "documentation discipline that transfer directly to senior engagement, records-keeping, and reporting.",
        "Led and collaborated with diverse teams, clients, and partners, strengthening the trust-building and "
        "communication skills central to working with seniors, volunteers, and community stakeholders.",
    ],
))

# --- Education & Professional Development ---
story += section("Education &amp; Professional Development")
edu_rows = [
    ("<b>Diploma in Social Service</b> \u2014 Hua Mei Training Academy, Tsao Foundation", "Jan 2025 \u2013 Present"),
    ("Master of Business Administration (MBA) \u2014 NTU"
     "&nbsp;&nbsp;<font color='#5B6470'>\u00b7 Dean's Honours List</font>", "2003"),
    ("Bachelor of Science \u2014 National University of Singapore (NUS)"
     "&nbsp;&nbsp;<font color='#5B6470'>\u00b7 PSC Scholarship</font>", "1994"),
]
etbl = Table(
    [[Paragraph(l, st_edu), Paragraph(r, st_date)] for l, r in edu_rows],
    colWidths=[13.6 * cm, 3.7 * cm],
)
etbl.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ("TOPPADDING", (0, 0), (-1, -1), 1),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
]))
story.append(etbl)

# --- Languages ---
story += section("Languages")
story.append(Paragraph(
    "English (fluent)&nbsp;&nbsp;<font color='#C8102E'>|</font>&nbsp;&nbsp;Mandarin (conversant)"
    "&nbsp;&nbsp;<font color='#C8102E'>|</font>&nbsp;&nbsp;Cantonese (conversant)", st_comp))

# --- Digital & Administrative Skills ---
story += section("Digital &amp; Administrative Skills")
story.append(Paragraph(
    "Microsoft Office (Word, Excel, PowerPoint) <font color='#C8102E'>|</font> Google Workspace "
    "<font color='#C8102E'>|</font> Data Visualisation &amp; Reporting", st_comp))


# ------------------------------------------------------------------ #
#  RENDER                                                            #
# ------------------------------------------------------------------ #
doc = SimpleDocTemplate(
    CFG["out"], pagesize=A4,
    leftMargin=1.5 * cm, rightMargin=1.5 * cm,
    topMargin=1.05 * cm, bottomMargin=0.9 * cm,
    title=f'{CFG["name"].title()} — Resume (Care Corner Associate, Programme)',
    author=CFG["name"].title(),
    subject="Associate (Programme), Active Ageing Centre — Care Corner",
)
doc.build(story)
print("Wrote", CFG["out"])
