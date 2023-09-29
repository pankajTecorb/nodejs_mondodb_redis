import { Schema, model } from 'mongoose';

interface address {
    userId:Object;
    type:string;    // home , work , other
    addressLine1: string;
    addressLine2:string;
    addressLine3:string
    lat:string;
    long:string;
    landmark:string;
    isActive: boolean;
    isDelete: boolean;
}

const schema = new Schema<address>({
    userId:{ type: Schema.Types.ObjectId, required:true, ref: 'User' },
    type: { type: String , required:true },
    addressLine1:{type:String },
    addressLine2:{type:String },
    addressLine3:{type:String },
    lat:{type:String , required:true },
    long:{type:String  , required:true},
    landmark:{type:String },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});

const addressModel = model<address>('address', schema);
export = addressModel