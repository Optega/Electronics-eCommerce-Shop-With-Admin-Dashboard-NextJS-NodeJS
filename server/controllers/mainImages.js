const { PrismaClient } = require("@prisma/client");

let prisma;

if (!prisma) {
  prisma = new PrismaClient();
}

async function uploadMainImage(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "No files uploaded." });
  }

  // Get file from a request
  const uploadedFile = req.files.uploadedFile;

  // Using mv method for moving file to the directory on the server
  uploadedFile.mv("../public/images/products/" + uploadedFile.name, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(200).json({ message: "File uploaded successfully" });
  });
}

module.exports = {
  uploadMainImage,
};
