/**
 * Created by jor on 25.05.2017.
 */
const mongoose=require('mongoose');
const model=require('./model');
const mongo= {
    set: (data, next) => {
        model.create(data, (err,dat)=>{
            if(err) console.error(err.stack);
            next();
             console.log(dat);
        });
    },
    get:(data)=>{
        model.findOne({eng:data},"rus", {lean:true},(err,doc)=>{
            if(err) consolee.error(err.stack);
            console.log(doc);
            return doc;
        });

    }
};
module.exports=mongo;