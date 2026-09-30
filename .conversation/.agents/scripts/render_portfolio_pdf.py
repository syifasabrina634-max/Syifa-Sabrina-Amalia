from pathlib import Path
import fitz

source = Path("attached_assets/Syifa_Sabrina_Amaliaa_1790749268597.pdf")
output = Path(".agents/outputs/portfolio_cv_pages")
output.mkdir(parents=True, exist_ok=True)

document = fitz.open(source)
print(f"pages={len(document)}")

for index, page in enumerate(document):
    image = page.get_pixmap(matrix=fitz.Matrix(1.0, 1.0), alpha=False)
    image.save(output / f"page-{index + 1:02d}.png")

sheet = fitz.open()
sheet_page = sheet.new_page(width=1120, height=1740)
for index in range(len(document)):
    column = index % 4
    row = index // 4
    box = fitz.Rect(20 + column * 275, 20 + row * 340, 270 + column * 275, 343 + row * 340)
    sheet_page.show_pdf_page(box, document, index)
    sheet_page.insert_text((box.x0, box.y1 + 14), f"PAGE {index + 1:02d}", fontsize=10)
sheet_page.get_pixmap(matrix=fitz.Matrix(1.2, 1.2), alpha=False).save(
    ".agents/outputs/portfolio-cv-contact-sheet.png"
)

print(f"rendered={output}")