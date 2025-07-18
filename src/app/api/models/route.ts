import dbConnect from "@/lib/database";
import Model from "@/model/modelSchema";
import { gridFsUpload } from "@/util/gridFsUpload";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
        await dbConnect();
        const models = await Model.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: models });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to fetch models" }, { status: 500 });
    }
}

export async function POST(req:Request){
    try {
        console.log("comes here")
        await dbConnect()
        const formData = await req.formData();
        const file = formData.get('file') as unknown as File;
        const name = formData.get('name') as string;

        if(!file || !name){
            return NextResponse.json({success:false,message:'File and model name are required'},{status:400})
        }

        const fileDetails= await gridFsUpload(file);
        console.log(fileDetails);
        const newModel = new Model({name,fileId:fileDetails.fileId,fileName:fileDetails.fileName,contentType:file.type})
        console.log(newModel)
        await newModel.save()
        return NextResponse.json({success:true,message:"Model Uploaded Successfully"},{status:201})

    } catch (error) {
        return NextResponse.json({success:false,message:"Failed to upload model"}, {status:500})
    }
}