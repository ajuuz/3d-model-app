import dbConnect from "@/lib/database";
import mongoose from "mongoose";
import { GridFSBucket, ObjectId } from "mongodb";
import { Readable } from "stream";


export const gridFsUpload =async(file:File):Promise<{fileId:ObjectId,fileName:string}>=>{
   
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes);
    const readableStream = Readable.from(buffer);


    const db = mongoose.connection.db!;
    const bucket = new GridFSBucket(db,{bucketName:'models_bucket'});

    const uploadStream = bucket.openUploadStream(file.name,{
        contentType:file.type||'application/octet-stream'
    })

    return new Promise((resolve, reject) => {
        readableStream.pipe(uploadStream)
          .on('error', (err:any) => reject(err))
          .on('finish', () => resolve({ fileId: uploadStream.id, fileName: uploadStream.filename }));
      });
}