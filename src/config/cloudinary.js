const cloudinary=require('cloudinary').v2;
const multer=require('multer');

function createCloudinary({cloudName, apiKey, apiSecret, folderPrefix, allowedMimeTypes=['image/jpeg','image/png','image/webp'], maxFileSize=5*1024*1024, maxFiles=5}){
    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret
    });

    const storage=multer.memoryStorage();

    const fileFilter=(req, file, cb)=>{
        //controllo tipi di file consentiti
        if(allowedMimeTypes.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname));
        }
    };

    const upload=multer({storage, fileFilter, limits:{
        fileSize: maxFileSize,//5MB per file 
        files: maxFiles//5
    }});

    //funzione di upload su cloudinary
    const uploadToCloudinary=(buffer, folder)=>{
        return new Promise((resolve, reject)=>{
            const stream=cloudinary.uploader.upload_stream(
                {folder: `${folderPrefix}/${folder}`},
                (error, result)=>{
                    if(error){
                        reject(error);
                    }else{
                        resolve({imageUrl: result.secure_url, publicId: result.public_id});
                    }
                }
            );
            stream.end(buffer);
        });
    };

    return {cloudinary, upload, uploadToCloudinary};
};

module.exports={createCloudinary};