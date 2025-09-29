
#claude-opus-4-1-20250805
#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
import aspose.ocr as ocr
import anthropic
import os

API_KEY = "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"
MODEL_NAME = "claude-opus-4-1-20250805"  # Claude model
PDF_PATH = "pg1.pdf"
OUTPUT_PATH = "output.txt"

client = anthropic.Client(api_key=API_KEY)

full_text = ""

try:
    # Initialize Aspose OCR engine
    api = ocr.AsposeOcr()

    # Load PDF for OCR
    settings = ocr.RecognitionSettings()
    settings.language = ocr.Language.load_default()
    settings.detect_areas_mode = ocr.DetectAreasMode.TEXT
    settings.fix_orientation = True

    ocr_input = ocr.OcrInput(ocr.InputType.PDF)
    ocr_input.add(PDF_PATH, settings)

    result = api.recognize(ocr_input)

    # Process each page
    for page_number, page in enumerate(result.pages):
        print(f"Processing page {page_number + 1}...")

        page_text = page.text if page.text else "(No text found on this page)"

        try:
            response = client.messages.create(
                model=MODEL_NAME,
                system="You are a helpful assistant that extracts tables and structured text.",
                messages=[
                    {"role": "user", "content": f"Extract all table data and plain text from this page:\n\n{page_text}"}
                ],
                max_tokens=2000
            )

            extracted_text = getattr(response, "completion", "(No output returned)")
            full_text += f"\n\n--- Page {page_number + 1} ---\n{extracted_text}"

        except Exception as e:
            print(f"Error processing page {page_number + 1}: {e}")

except FileNotFoundError:
    print(f"Error: PDF file '{PDF_PATH}' not found.")
except Exception as e:
    print(f"An error occurred: {e}")

with open(OUTPUT_PATH, "w", encoding="utf-8") as out_file:
    out_file.write(full_text)

print(f"Extraction complete! Output saved to {OUTPUT_PATH}")
