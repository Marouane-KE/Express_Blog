const multer = require("multer");

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./Public/uploads/"); // Store uploaded files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); // Set a unique filename
    },
  });
  
  const upload = multer({ storage: storage });

 
  module.exports= upload;