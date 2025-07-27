import * as pdf from "pdf-parse";

export async function processPdf(buffer: Buffer): Promise<any> {
  try {
    const data = await pdf(buffer);
    const text = data.text;

   
    const lines = text.split("\n").map(line => line.trim()).filter(line => line);
    
    
    const parsedData = lines.map((line, idx) => ({
      id: idx + 1,
      content: line,
    }));

    return {
      totalLines: parsedData.length,
      data: parsedData,
    };
  } catch (err) {
    throw new Error("PDF parsing failed: " + (err as Error).message);
  }
}
