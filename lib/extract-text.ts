import PDFParser from "pdf2json";
import mammoth from "mammoth";
import { promises as fs } from "fs";
import path from "path";
import os from "os";

export async function extractText(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  switch (file.type) {
    case "text/plain":
    case "text/markdown":
      return await file.text();

    case "application/pdf": {
      const tempPath = path.join(
        os.tmpdir(),
        `${Date.now()}-${file.name}`
      );

      await fs.writeFile(tempPath, buffer);

      try {
        const text = await new Promise<string>((resolve, reject) => {
          const pdfParser = new (PDFParser as any)(null, 1);

          pdfParser.on("pdfParser_dataReady", () => {
            resolve((pdfParser as any).getRawTextContent());
          });

          pdfParser.on("pdfParser_dataError", (err: any) => {
            reject(err);
          });

          pdfParser.loadPDF(tempPath);
        });

        return text;
      } finally {
        await fs.unlink(tempPath).catch(() => {});
      }
    }

    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      const result = await mammoth.extractRawText({
        buffer,
      });

      return result.value;
    }

    default:
      return "";
  }
}