/**
 * Created by jor on 25.05.2017.
 */
const mongoose=require('mongoose');
const model=require('./model');
const mongo= {
    set: (data, next) => {
        model.create(data, (err,data)=>{
            if(err) console.error(err.stack);
            next();
            console.log("qcela");
        });
    },
    get:(data)=>{
        model.findOne({'eng':data},"rus", {lean:true},(err,doc)=>{
            if(err) consolee.error(err.stack);
            console.log(doc);
        });

    }
}
module.exports=mongo;