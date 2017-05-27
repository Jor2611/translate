/**
 * Created by jor on 25.05.2017.
 */
const mongoose=require('mongoose');
const dataSchema=mongoose.Schema({eng:String,rus:String},{versionKey:false});
const data=mongoose.model('data',dataSchema);
module.exports=data;