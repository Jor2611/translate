const Api = require("rosette-api");
const VK=require('vk-io');
const vk=new VK({token:'42b6b4c3e7bffd04040f2611695747f9746c7c5a59857e6b654ec6b256fd80bac63e0fcee2bb45b400b77'});
const mongoose=require('mongoose');
const mongoReq=require('./mongoRequests');


mongoose.connect("mongodb://Jora:630132@ds151951.mlab.com:51951/heroku_qs3ztqks");
const db=mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Kpela");
});
const api = new Api("ec5cf24324858b93682fbda69a3eb7a8");
const endpoint = "language";
vk.longpoll.start()
    .then(() => {
        console.log('Long Poll запущен');
    })
    .catch((error) => {
        console.error(error);
    });
vk.longpoll.on('message',(msg)=>{
    if(msg.flags.indexOf('outbox')!==-1){
        return;
    }
    if(msg.text=="Htu translation?"){
        msg.send("Example` Tree (MEANS) Дерево - to insert the word.\nExample` Tree (TRANSLATE)-for translation.");
    }
    let mess=msg.text.split(" ");
    let mean={eng:mess[0],rus:mess[2]};
    let firstWord=/^[A-Z][a-z]/;

    let content=mess[2];
    api.parameters.content=content;

    if(firstWord.test(mess[0]) && mess[1]=="(MEANS)" && mess.length==3) {

        api.rosette(endpoint, function (err, res) {
            if (err) {
                console.log(err)
            } else {
                // console.log(JSON.stringify(res,null, 2));
                console.log(res.languageDetections);
                let langDetect = res.languageDetections;
                const language = langDetect.map((x) => {
                    return x.language;
                });

               if( language.indexOf('rus') !== -1 && mess[2].search(/[A-Za-z0-9]/)==-1){

                   mongoReq.set(mean,(err,data)=>{
                       if(err) console.error(err.stack);
                       console.log("qcela");
                   });
               }
            }
        });
    }else if(mess[0]=='(TRANSLATE)' && firstWord.test(mess[1]) && mess.length==2){
        mongoReq.get(mess[1],(err,data)=>{
            msg.send(data);
        });
    } else if( mess.indexOf('(MEANS)')!==-1 || mess.indexOf('(TRANSLATE)')!==-1){
        msg.send("TRANSLATOR:::If want to know how to use translator type 'Htu translation?'");
    }
});
