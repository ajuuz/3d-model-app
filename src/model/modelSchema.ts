import mongoose, { ObjectId } from "mongoose";


export interface IModel extends Document{
   name:string,
   fileId:ObjectId,
   fileName:string,
   contentType:string,
   createdAt:Date,
   updatedAt:Date,
}

export const modelSchema = new mongoose.Schema<IModel>({
    name:{
        type:String,
        required:[true,'Please provide a name for model'],
        trim:true,
    },
    fileId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    fileName:{
        type:String,
        required:true
    },
    contentType:{
        type:String,
        required:true
    },
},{timestamps:true});

const model = mongoose.models.model || mongoose.model<IModel>('models',modelSchema);

export default model;
