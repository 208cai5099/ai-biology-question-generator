import pdfplumber
import os

filename = "august_2025_exam"
current_dir = os.path.dirname(os.path.abspath(__file__))

input_path = os.path.join(current_dir, "exams", f"{filename}.pdf")

with pdfplumber.open(input_path) as pdf:
    page_texts = [p.extract_text() for p in pdf.pages]

output_path = os.path.join(current_dir, "exams", f"{filename}_transcript.txt")

with open(output_path, "a", encoding="utf-8", errors="replace") as file:
    for t in page_texts:
        file.write(t)
        file.write("\n\n")