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
        model.findOne({eng:data},"rus",(err,doc)=>{
            if(err) return console.error(err.stack);
            next(null,doc);
        });

    },
    getall:(next)=>{
        model.find({},(err,doc)=>{
           if(err) return console.error(err.stack);
           let gett=doc.map((x)=>{
               return "\n"+x.eng+" - "+x.rus;
           });
           console.log(gett);
           next(null,gett);
        });
    }
};
module.exports=mongo;