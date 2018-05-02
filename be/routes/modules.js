var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var jwt = require('jsonwebtoken');
var db = require('../models/db');
var router = express.Router();

router
   .get('/', function (req, res) {
      db.modules.find({}, function (err, modules) {
         if (err) return res.status(400).send(err);

         return res.status(200).send(modules);
      });
   })
   .get('/:id', function (req, res) {
      db.modules.findOne({ _id: req.params.id }, function (err, modulo) {
         if (err) return res.status(400).send(err);
         if (modulo == null) return res.status(404).send();

         return res.status(200).send(modulo);
      });
   })
   .get('/lista/:id', function (req, res) {
    console.log('hola')
    db.modules.find({ program: req.params.id }, function (err, modules) {
       if (err) return res.status(400).send(err);

       return res.status(200).send(modules);
    });
 })
   .post('/', function (req, res) {
      var modulo = new db.modulos(req.body);
      db.modulos.findOne({name: req.body.name}, function(err, existName){
            if(existName == null){
                if (modulo.number == '' || modulo.name == '' || modulo.content == []) return res.status(400).send();
                modulo.save(function (err, modulo) {
                    if (err) return res.status(400).send(err);
                    return res.status(201).send(modulo);
                 });
            }else{
                if (err) return res.status(400).send(err);
                console.log('El nombre del Modulo ya existe');
            }
      });
   }) 
   .put('/:id', function (req, res) {
      db.modulos.findOne({ _id: req.params.id }, function (err, modulo) {
         if (err) return res.status(400).send(err);
         if (modulo == null) return res.status(404).send();

         for (i in req.body) {
            modulo[i] = req.body[i];
         }
         modulo.save(function (err, modulo) {
            if (err) return res.status(400).send(err);

            return res.status(200).send(modulo);
         });
      });
   })
   .put('/edit/:id', function(req, res){
    console.log(req.body)
    console.log(req.params.id)
     db.programs.update({_id: req.params.id},
        {
            $set: {'number': req.body.number,
                   'name': req.body.name,
                   'content': req.body.content}
        }).exec(function(err, off){
            if (err) return res.status(400).send(err);
      })
   })
   .delete('/:id', function (req, res) {
      db.modulos.remove({ _id: req.params.id }, function (err, modulo) {
         if (err) return res.status(400).send(err);

         return res.status(200).send(modulo);
      });
   });

module.exports = router;