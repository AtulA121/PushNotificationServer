let express=require("express");
let cors=require("cors");
let bodyParser=require("body-parser");
let webpush=require("web-push");

let app=express();

app.use(cors());
app.use(bodyParser.json());

const PUBLIC_VAPID = "BJXHzJbAv88mOxIY-ZfWwqhq65CBnmmTUEqG8DpT18CeLfXooirhES_5MSZK-2skflD-PpCBesAWjy_Ruv5_cQU";
const PRIVATE_VAPID = "sRZhcdaxAs7RDhufwqzoCrVi9DOKKc2lGFJH-KaswWI";
webpush.setVapidDetails('mailto:atulpisal.ap@gmail.com', PUBLIC_VAPID, PRIVATE_VAPID);

const notificationPayload = {
    "notification": {
        "title": "Hire seat",
        "body": "New Question asked...",
        "icon": "assets/icons/icon-512x512.png",
        "vibrate": [100, 50, 100],
        // "image": "assets/icons/icon-512x512.png",
        "url": "http://localhost:8080/",
        "link": "http://localhost:8080/",
        "endpoint": "http://localhost:8080/",
        "sound" : "assets/icons/a121.mp3",
        "message" : "a121",
        // "tag" : "push demo",
        // "requireInteraction" : true,
        // "renotify" : true,
        "data": {
            "dateOfArrival": Date.now(),
            "primaryKey": 1,
            // "url" : "https://google.com"
        },
        "actions": [{
            "action": "chrome",
            "title": "Go to the site"
        }]
    }
};

app.use("/subscribe",(req,res)=>{
    const subscription = req.body;
    console.log("/subscriber request : ",req.body);
    webpush.sendNotification(subscription,JSON.stringify(notificationPayload)).then(data=>{
        console.log("data ----",data);
        res.send({
            data : data,
            result : subscription
        });
    }).catch(err=>{
        console.log("error ----",err);
        res.send({
            erro : err,
            result : subscription
        });
    }); 
});

app.listen(3000,()=>{
    console.log("server listen on 3000...");
});