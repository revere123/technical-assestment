const aws = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3');

module.exports = {
    s3FileUploadAPI() {
        aws.config.update({
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID
        });
        const s3 = new aws.S3();
        const awsStorage = multerS3({
            s3: s3,
            bucket: process.env.AWS_BUCKET_ACCESS_IMAGES,
            key: function (req, file, cb) {
                cb(null, Date.now() + '.' + file.originalname);
            }
        });
        return multer({
            storage: awsStorage
        });
    }
}