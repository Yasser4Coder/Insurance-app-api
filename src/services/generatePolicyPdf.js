import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const __dirname = path.resolve();

export const generatePolicyPDF = (policy) => {
  return new Promise((resolve, reject) => {
    const pdfsDir = path.join(__dirname, "pdfs");

    if (!fs.existsSync(pdfsDir)) {
      fs.mkdirSync(pdfsDir);
    }

    const fileName = `policy-${policy._id}.pdf`;
    const filePath = path.join(pdfsDir, fileName);

    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    // Header
    doc
      .fontSize(22)
      .text("Insurance Policy Document", { align: "center" })
      .moveDown();

    const addLabelValue = (label, value) => {
      doc.font("Helvetica-Bold").text(label, { continued: true });
      doc.font("Helvetica").text(value);
    };

    // Policy Info
    doc
      .fontSize(14)
      .text("Policy Information", { underline: true })
      .moveDown(0.5);

    addLabelValue("Policy ID: ", policy._id);
    addLabelValue("Type: ", policy.type);
    addLabelValue("Status: ", policy.status);
    addLabelValue("Price: ", `${policy.price} DZD`);

    doc.moveDown();

    // Related IDs
    doc.fontSize(14).text("Related IDs", { underline: true }).moveDown(0.5);

    addLabelValue("User ID: ", policy.user);
    addLabelValue("Vehicle ID: ", policy.vehicle);

    doc.moveDown();

    // Dates
    doc.fontSize(14).text("Coverage Dates", { underline: true }).moveDown(0.5);

    addLabelValue(
      "Start Date: ",
      policy.startDate ? new Date(policy.startDate).toDateString() : "N/A"
    );
    addLabelValue(
      "End Date: ",
      policy.endDate ? new Date(policy.endDate).toDateString() : "N/A"
    );

    // Footer
    doc
      .moveDown(2)
      .fontSize(10)
      .fillColor("gray")
      .text("This is a system-generated insurance policy document.", {
        align: "center",
      });

    doc.end();

    stream.on("finish", () => {
      resolve(`/pdfs/${fileName}`);
    });

    stream.on("error", (err) => {
      reject(err);
    });
  });
};
