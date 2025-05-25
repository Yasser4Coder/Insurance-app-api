import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const __dirname = path.resolve();

export const generatePolicyPDF = (policy) => {
  return new Promise((resolve, reject) => {
    const fileName = `policy-${policy._id}.pdf`;
    const filePath = path.join(__dirname, "pdfs", fileName);

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(20).text("Insurance Policy", { align: "center" });
    doc.moveDown();
    doc.fontSize(12);
    doc.text(`Policy ID: ${policy._id}`);
    doc.text(`Type: ${policy.type}`);
    doc.text(`User ID: ${policy.user}`);
    doc.text(`Vehicle ID: ${policy.vehicle}`);
    doc.text(`Start Date: ${new Date(policy.startDate).toDateString()}`);
    doc.text(`End Date: ${new Date(policy.endDate).toDateString()}`);
    doc.text(`Price: ${policy.price} DZD`);
    doc.text(`Status: ${policy.status}`);

    doc.end();

    stream.on("finish", () => {
      resolve(`/pdfs/${fileName}`);
    });

    stream.on("error", (err) => {
      reject(err);
    });
  });
};
