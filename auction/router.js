const express = require('express')
const router = express.Router()
const multer_ = require('multer')
const fs = require('fs')

const storage = multer_.diskStorage({
    destination(req,file,cb){
        cb(null,'static')
    },
    filename(req,file,cb){
        cb(null, file.originalname)
    }
})

const fileloader = multer_({storage: storage});

let paintings = require('./json/paintings.json');
let participants = require('./json/participants.json');
let auck_date = "2021-10-30"
let num_of_att = "5";

router.get('/', (req, res) => {
    res.render("index",{
        date: auck_date,
        num_of_part: participants.length,
        num_of_lots: paintings.length,
        num_of_att: num_of_att
    });
});

router.get('/participants', (req, res) => {
    res.render("participants_list",{
        participants: participants
    });
});

router.get('/paint_list', (req, res) => {
    res.render("paintings",{
        paintings: paintings
    });
});

router.get('/lot/:id', (req, res) => {
    let id = req.params.id;
    let curr_lot = "";
    for(let key of paintings){
        if(key.id === id){
            curr_lot=key;
        }
    }
    res.render("lot",{
        lot: curr_lot
    });
});

router.get('/settings', (req, res) => {
    res.render("settings",{

    });
});

router.post('/addparticipant',(req,res)=>{
    participants.push({id: participants.length+1,name: req.body.name,budget:req.body.budget});
    fs.writeFileSync('./json/participants.json', JSON.stringify(participants), null, 4);
    res.end(JSON.stringify(req.body))
})

router.post('/addpaint', (req,res)=>{
    let id = paintings.length+1;
    id = id.toString()
    paintings.push({id: id, title: req.body.title, author:req.body.author, year: req.body.year, price: req.body.price});
    fs.writeFileSync('./json/paintings.json', JSON.stringify(paintings), null, 4);
    res.end(JSON.stringify(req.body))
})

router.post('/change_settings',(req,res)=>{
    auck_date = req.body.date;
    num_of_att = req.body.num_of_att;
    res.render("index",{
        date: auck_date,
        num_of_part: participants.length,
        num_of_lots: paintings.length,
        num_of_att: num_of_att
    });
})

router.post("/delete_participant", (req,res)=>{
    let id = req.body.id;
    let index = "";
    for(let i=0;i<participants.length;i++){
        if(+participants[i].id === +id){
            index = i;
            console.log(id,index);
        }
    }
    participants.splice(index, 1);
    fs.writeFileSync('./json/participants.json', JSON.stringify(participants), null, 4);
    res.end(JSON.stringify(participants));
})

router.delete("/delete_painting", (req,res)=>{
    let id = req.body.id;
    let index = "";
    for(let i=0;i<paintings.length;i++){
        if(paintings[i].id === id){
            index = i;
        }
    }
    paintings.splice(index, 1);
    fs.writeFileSync('./json/paintings.json', JSON.stringify(paintings), null, 4);
    res.end(JSON.stringify(paintings));
})

router.post('/redact_lot/:id', (req,res)=>{
    for(let key of paintings){
        if(key.id === req.params.id){
            key.author = req.body.author;
            key.title = req.body.title;
            key.price = req.body.price;
            key.year = req.body.year;
        }
    }
    fs.writeFileSync('./json/paintings.json', JSON.stringify(paintings), null, 4);
    res.redirect("/lot/" + req.params.id);
})

router.post('/redact_img/:id', fileloader.single("file_image") ,(req,res)=>{
    let file = req.file;
    if(!file){
        console.log("File error!");
    }else{
        for(let key of paintings){
            if(key.id === req.params.id){
                key.img= "./static/" + req.file.originalname;
            }
        }
    }
    fs.writeFileSync('./json/paintings.json', JSON.stringify(paintings), null, '\t');
    res.redirect("/lot/" + req.params.id);
})

router.post('/redact_participant/:id', (req,res)=>{
    let id= req.params.id;
    console.log(req.body);
    for(let key of participants){
        if(key.id === id){
            key.name = req.body.name;
            key.budget = req.body.budget;
        }
    }
    fs.writeFileSync('./json/participants.json', JSON.stringify(participants), null, 4);
    res.end(JSON.stringify(participants));
})

module.exports = router;