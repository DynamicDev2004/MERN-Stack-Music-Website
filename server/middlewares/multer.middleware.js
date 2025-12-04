import multer from "multer"
import path from "path";
import { access } from "fs/promises";
import { constants } from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, req.targetDirectory)
  },
filename: async function (req, file, cb) {
  const sanitized = file.originalname.replace(/\s+/g, "_");
  try {
    const filePath = path.join(req.targetDirectory, sanitized);
    await access(filePath, constants.F_OK);
    return cb(new Error("File already exists"), false);

  } catch (err) {
 

    if (err.code === "ENOENT") return cb(null, sanitized);
    return cb(err);
  }
}
})

export const upload = multer({ storage: storage })