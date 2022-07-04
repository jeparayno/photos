const PhotoModel = require('../models/photo.models');
const fs = require("fs");

const getallSingleFiles =  ((req, res) => {
    PhotoModel.find()
    .then((allPhotos)=>{
        res.json(allPhotos)})
    .catch((err)=>res.json(err))
})

const getOneFile =  ((req, res) => {
    PhotoModel.findOne({_id: req.params.photoId})
    .then((onePhoto)=>{
        res.json(onePhoto)})
    .catch((err)=>res.json(err))
})

const recentlyUploaded =  ((req, res) => {
    PhotoModel.find().sort({createdAt:-1}).limit(5)
    .then((uploadedPhoto)=>{
        res.json(uploadedPhoto)})
    .catch((err)=>res.json(err))
})

const topLikes =  ((req, res) => {
    PhotoModel.find().sort({likes:-1}).limit(5)
    .then((likedPhotos)=>{
        res.json(likedPhotos)})
    .catch((err)=>res.json(err))
})

const singleFileUpload = ((req, res)=>{
    const file = {
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        description: req.body.description,
        likes: req.body.likes
    }
    PhotoModel.create(file)
    .then((newFile)=>{
        res.json(newFile)
    })
    .catch((err)=>{
        console.log(err)
        res.status(400).json(err);
    })
})

const deleteOneFile = ((req,res)=>{
    PhotoModel.findByIdAndDelete({_id:req.params.photoId})
    .then((deletedPhoto)=>{
        fs.unlinkSync(deletedPhoto.filePath) // deletes photo in uploads folder
        res.json(deletedPhoto)
    })
    .catch((err)=>console.log(err))
})

const deleteOne = ((req, res) => {
    PhotoModel.deleteOne({_id: req.params.photoId}) //deletes photo in DB
    .then((deletePhoto) => {res.json(deletePhoto)})
    .catch((err) => {res.status(400).json(err);})
}); 

module.exports = {
    recentlyUploaded,
    topLikes,
    singleFileUpload,
    getallSingleFiles,
    deleteOneFile,
    getOneFile,
    deleteOne,
}