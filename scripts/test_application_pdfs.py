import unittest
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "docs"


def extract(name: str) -> str:
    path = PUBLIC / name
    if not path.exists():
        raise AssertionError(f"Missing generated PDF: {path}")
    return "\n".join(page.extract_text() or "" for page in PdfReader(path).pages)


def extract_links(name: str) -> list[str]:
    path = PUBLIC / name
    if not path.exists():
        raise AssertionError(f"Missing generated PDF: {path}")
    links = []
    for page in PdfReader(path).pages:
        for annotation_ref in page.get("/Annots", []):
            annotation = annotation_ref.get_object()
            action = annotation.get("/A")
            if action and action.get("/URI"):
                links.append(str(action["/URI"]))
    return links


class ApplicationPdfContract(unittest.TestCase):
    def test_resume_contains_selarang_case_manager_and_suss_credentials(self):
        text = extract("John_Tan_Resume_Case_Manager_Selarang_Halfway_House.pdf")
        for expected in (
            "CASE MANAGER",
            "SELARANG HALFWAY HOUSE",
            "Graduate Diploma in Social Work",
            "Singapore University of Social Sciences (SUSS)",
            "Currently enrolled",
            "Programme Associate",
            "Yellow Ribbon",
        ):
            self.assertIn(expected, text)

    def test_resume_links_to_deployed_profile(self):
        name = "John_Tan_Resume_Case_Manager_Selarang_Halfway_House.pdf"
        text = extract(name)
        self.assertIn("john-tan-presentation.vercel.app", text)
        self.assertIn("https://john-tan-presentation.vercel.app", extract_links(name))

    def test_cover_letter_contains_selarang_halfway_house_and_social_work_focus(self):
        text = extract("John_Tan_Cover_Letter_Case_Manager_Selarang_Halfway_House.pdf")
        for expected in (
            "Case Manager",
            "Selarang Halfway House",
            "Yellow Ribbon Industries",
            "Graduate Diploma in Social Work",
            "Singapore University of Social Sciences (SUSS)",
            "Programme Associate",
            "Community-Based Programme",
        ):
            self.assertIn(expected, text)


if __name__ == "__main__":
    unittest.main()
