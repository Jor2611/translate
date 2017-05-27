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
    get:(data, next)=>{
        model.findOne({eng:data},"rus",{lean:true},(err,doc)=>{
            if(err) return console.error(err.stack);
            next(null,doc);
        });

    },
    getall:(data,next)=>{
        model.find({eng:data},"rus",{lean:true},(err,doc)=>{
           if(err) return console.errror(err.stack);
           console.log(doc);

           next(null,doc);
        });
    }
};
module.exports=mongo;