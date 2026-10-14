import unittest
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
RESUME = ROOT / "public" / "docs" / "John_Tan_Resume_SWK512_Practicum.pdf"


def text() -> str:
    if not RESUME.exists():
        raise AssertionError(f"Missing generated PDF: {RESUME}. Run python scripts/build_practicum_resume.py")
    return "\n".join(page.extract_text() or "" for page in PdfReader(RESUME).pages)


def links() -> list[str]:
    found = []
    for page in PdfReader(RESUME).pages:
        for ref in page.get("/Annots", []):
            action = ref.get_object().get("/A")
            if action and action.get("/URI"):
                found.append(str(action["/URI"]))
    return found


class PracticumResumeContract(unittest.TestCase):
    def test_targets_swk512_and_suss(self):
        content = text()
        for expected in (
            "SWK512",
            "Graduate Diploma in Social Work",
            "Singapore University of Social Sciences (SUSS)",
            "Practicum learning objectives",
            "Supervision commitment",
            "400",
        ):
            self.assertIn(expected, content)

    def test_lists_all_six_competencies(self):
        content = text()
        for expected in ("Ethical and professional", "client systems", "service delivery", "Evaluating practice", "research", "Policy practice"):
            self.assertIn(expected, content)

    def test_drops_unsupported_job_application_claims(self):
        content = text()
        for removed in ("SPS", "Selarang", "Yellow Ribbon", "zero log backlog", "six years", "CBP"):
            self.assertNotIn(removed, content)

    def test_is_two_pages_and_links_to_profile(self):
        self.assertEqual(len(PdfReader(RESUME).pages), 2)
        self.assertIn("https://john-tan-profile.vercel.app", links())


if __name__ == "__main__":
    unittest.main()
