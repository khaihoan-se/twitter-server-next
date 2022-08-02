import multer from 'multer'
import { Request } from 'express'

const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, 'uploads');
  },
  filename: (req: Request, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});
const filefilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb(null, true);
  }else {
    cb(null, false);
  }
}

const upload = multer({storage: storage, fileFilter: filefilter});

export default upload;