// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/database';
// import { GridFSBucket, ObjectId } from 'mongodb';
// import mongoose from 'mongoose';
// import { Readable } from 'stream';

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         await dbConnect();

//         const { id } = params;

//         if (!ObjectId.isValid(id)) {
//             return NextResponse.json({ success: false, message: 'Invalid model ID' }, { status: 400 });
//         }

//         const db = mongoose.connection.db;
//         const bucket = new GridFSBucket(db, { bucketName: 'models_bucket' });

//         const downloadStream = bucket.openDownloadStream(new ObjectId(id));

//         const readable = Readable.from(downloadStream);

//         return new NextResponse(readable as any, {
//             headers: {
//                 'Content-Type': 'model/gltf-binary',
//                 'Content-Disposition': `attachment; filename="model.glb"`,
//             },
//         });

//     } catch (error: any) {
//         console.error('File fetch error:', error);
//         if (error.code === 'ENOENT') {
//              return NextResponse.json({ success: false, message: 'Model not found in storage' }, { status: 404 });
//         }
//         return NextResponse.json({ success: false, message: 'Failed to fetch model file' }, { status: 500 });
//     }
// }
