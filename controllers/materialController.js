const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Material } = require('../models/material');

// => localhost:3000/materials/
router.get('/', (req, res) => {
    Material.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Materials :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Material.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Material :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/',(req,res)=>{
    var mat=new Material({
        Domain : req.body.Domain,
        course_id : req.body.course_id,
        link1 : req.body.link1,
        link2 : req.body.link2,
        link3 : req.body.link3,
        video1: req.body.video1,
        video2: req.body.video2,
        video3: req.body.video3,
        Cost: req.body.Cost
    });
    mat.save((err,docs)=>{
        if(!err)
            res.send(docs);
        else
            console.log('Error in Retrieving Materials : '+JSON.stringify(err,undefined,2));
    });
});

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with the given id : $(req.params.id)`);
    var mat={
        Domain : req.body.Domain,
        course_id : req.body.course_id,
        link1 : req.body.link1,
        link2 : req.body.link2,
        link3 : req.body.link3,
        video1: req.body.video1,
        video2: req.body.video2,
        video3: req.body.video3,
        Cost: req.body.Cost
    };
    Material.findByIdAndUpdate(req.params.id,{$set:mat},{new:true},(err,data)=>{
        if(!err)
            res.send(data);
        else
            console.log('Error in Material Update : '+JSON.stringify(err,undefined,2));
    });
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with the given id : $(req.params.id)`);

    Material.findByIdAndRemove(req.params.id,(err,data)=>{
        if(!err)
            res.send(data);
        else
            console.log('Error in Material Delete : '+JSON.stringify(err,undefined,2));
    });
});

module.exports = router;