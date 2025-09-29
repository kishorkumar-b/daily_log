""" import aspose.ocr as ocr


''' set license '''

#lic = ocr.license.License()
#lic.set_license('path')


''' initialize main class '''
api = ocr.AsposeOcr()


''' add filters if you need '''
filters = ocr.models.preprocessingfilters.PreprocessingFilter()



''' initialize image collection and put images into it '''
input = ocr.OcrInput(ocr.InputType.PDF, filters)
input.add("pg1.pdf")


''' change recognition options if you need '''
settings = ocr.RecognitionSettings()
settings.detect_areas_mode=ocr.DetectAreasMode.TABLE


''' run recognition '''
res = api.recognize(input)
print(res[0].recognition_text)
 """

""" import aspose.ocr as ocr


''' set license '''

#lic = ocr.license.License()
#lic.set_license('path')


''' initialize main class '''
api = ocr.AsposeOcr()


''' add filters if you need '''
filters = ocr.models.preprocessingfilters.PreprocessingFilter()
#filters.add(ocr.models.preprocessingfilters.PreprocessingFilter.auto_skew())

''' initialize image collection and put images into it '''
input = ocr.OcrInput(ocr.InputType.PDF, filters)
input.add("pg1.pdf")

''' change recognition options if you need '''
settings = ocr.PassportRecognitionSettings()

''' run recognition '''
res = api.recognize_passport(input, settings)

''' print result '''
print(res[0].recognition_text) """



""" import aspose.ocr as ocr
import csv

# === Step 1: Set license (if available) ===
# lic = ocr.license.License()
# lic.set_license('path/to/license')

api = ocr.AsposeOcr()

filters = ocr.models.preprocessingfilters.PreprocessingFilter()
#filters.add(ocr.models.preprocessingfilters.PreprocessingFilter.auto_skew())  # Optional: improve accuracy

input_pdf = ocr.OcrInput(ocr.InputType.PDF, filters)
input_pdf.add("pg1.pdf")

passport_settings = ocr.PassportRecognitionSettings()

res = api.recognize_passport(input_pdf, passport_settings)

output_csv_path = "passport_output.csv"

with open(output_csv_path, mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["Page Number", "Recognition Text"])

    for idx, result in enumerate(res, start=1):
        writer.writerow([idx, result.recognition_text])

print(f"✅ Passport recognition results saved to {output_csv_path}")
 """
import aspose.ocr as ocr
import csv
api = ocr.AsposeOcr()


filters = ocr.models.preprocessingfilters.PreprocessingFilter()
filters.add(ocr.models.preprocessingfilters.PreprocessingFilter.auto_skew())

input_pdf = ocr.OcrInput(ocr.InputType.PDF, filters)
input_pdf.add("pg1.pdf")

settings = ocr.RecognitionSettings()
settings.detect_areas_mode = ocr.DetectAreasMode.TABLE
print("🔍 Running Aspose OCR with safe filters...")
res = api.recognize(input_pdf, settings)

output_csv_path = "table_output.csv"

with open(output_csv_path, mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)

    for idx, result in enumerate(res, start=1):
        writer.writerow([idx, result.recognition_text])

print(f"✅ Table recognition results saved to {output_csv_path}")


