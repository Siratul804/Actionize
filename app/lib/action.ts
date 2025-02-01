"use server";
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';


export const Upload = async (formData: FormData) =>{
   
    const file = formData.get('image') as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        tags: ['nextjs-server-actions-upload-imgs'],
        upload_preset: 'actionize-imgs'
      }, function (error, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      })
      .end(buffer);
    });

    revalidatePath('/')
  }