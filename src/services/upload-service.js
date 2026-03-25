import cloudinary from "../config/cloudinary-config/index.js";

export const uploadImageService =
async (fileBuffer) => {

    return new Promise(
        (resolve, reject) => {

            cloudinary.uploader.upload_stream(
                {
                    folder: "social-media-posts"
                },

                (error, result) => {

                    if (error)
                        return reject(error);

                    resolve({
                        url: result.secure_url,
                        publicId: result.public_id,
                        width: result.width,
                        height: result.height,
                        format: result.format
                    });

                }

            ).end(fileBuffer);

        }
    );
};