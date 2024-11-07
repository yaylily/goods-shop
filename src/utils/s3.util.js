import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET,
} from '../constant/env.constant.js';
import { MESSAGES } from '../constant/message.constant.js';
import { HttpError } from '../errors/http-error.js';

const s3 = new AWS.S3({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const allowedExtensions = ['.png', '.jpg', '.jpeg'];

const uploadToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const today = new Date().toISOString().split('T')[0];
      const randomNumber = Math.floor(Math.random() * 1e8);
      const extension = path.extname(file.originalname).toLowerCase();

      // 허용된 확장자 파일인지 확인
      if (!allowedExtensions.includes(extension)) {
        return cb(
          new HttpError.BadRequest(MESSAGES.GOODS.UPLOAD_IMG.NOT_SUPPORT),
        );
      }
      //파일 이름 설정
      const filePath = `uploadToS3/${today}_${randomNumber}${extension}`;
      cb(null, filePath);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, //10MB,
});

// 각각 이미지 필드 설정
export const uploadFields = uploadToS3.fields([
  { name: 'thumbnailImg', maxCount: 1 },
  { name: 'detailImg', maxCount: 1 },
]);
