import { Schema, model } from 'mongoose';

interface explore {
  name: string;
  lower_name:string;
  meso_name:String;
  description:String;
  meso_description:String;
  image: string;
  click:boolean;
  position: string; 
  isActive: boolean;
  isDelete: boolean;
}

const schema = new Schema<explore>({ 
  name: { type: String, required: true },
  lower_name:{type:String},
  meso_name: { type: String },
  description: { type: String },
  meso_description: { type: String},
  image: { type: String },
  click:{type:Boolean},
  position: { type: String},
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false }, 
}, {
  timestamps: true,
  versionKey: false
});

const exploreModel = model<explore>('explore', schema);
export = exploreModel;