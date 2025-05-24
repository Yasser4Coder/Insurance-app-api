const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

async function generatePolicyPDF(policy) {
  const fileName = `policy-${policy._id}.pdf`;
  const filePath = path.join(__dirname, "pdfs", fileName);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const html = `
    <html>
      <body>
        <h1>Insurance Policy</h1>
        <p><strong>Policy ID:</strong> ${policy._id}</p>
        <p><strong>Type:</strong> ${policy.type}</p>
        <p><strong>User:</strong> ${policy.user}</p>
        <p><strong>Vehicle:</strong> ${policy.vehicle}</p>
        <p><strong>Start Date:</strong> ${new Date(
          policy.startDate
        ).toDateString()}</p>
        <p><strong>End Date:</strong> ${new Date(
          policy.endDate
        ).toDateString()}</p>
        <p><strong>Price:</strong> ${policy.price} DZD</p>
        <p><strong>Status:</strong> ${policy.status}</p>
      </body>
    </html>
  `;

  await page.setContent(html);
  await page.pdf({ path: filePath, format: "A4" });
  await browser.close();

  return `/pdfs/${fileName}`; // relative path
}

module.exports = generatePolicyPDF;
