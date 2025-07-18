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
        unique:true
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

const Model = mongoose.models.Model || mongoose.model<IModel>('Model',modelSchema);

export default Model;
