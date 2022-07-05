const PhotoModel = require('../models/photo.models');
const fs = require("fs");

const getallSingleFiles =  ((req, res) => {
    PhotoModel.find()
    .then((allPhotos)=>{
        res.json(allPhotos)})
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

const getOneFile =  ((req, res) => {
    PhotoModel.findOne({_id: req.params.photoId})
    .then((onePhoto)=>{
        res.json(onePhoto)})
    .catch((err)=>res.json(err))
})

const searchFile =  ((req, res) => {
    const filter = req.params.description;
    PhotoModel.find({"description":{$regex: ".*" + filter + ".*" }})
    .then((search)=>{
        res.json(search)})
    .catch((err)=>res.json(err))
})

const deleteOne = ((req, res) => {
    PhotoModel.findByIdAndDelete({_id: req.params.photoId}) //deletes photo in DB
    .then((deletePhoto) => {
        fs.unlinkSync(deletePhoto.filePath) // deletes photo in uploads folder
        res.json(deletePhoto)
    })
    .catch((err) => {res.status(400).json(err);})
}); 

const updateOne = ((req, res) => {
    PhotoModel.findOneAndUpdate({_id: req.params.photoId}, req.body, { new: true, runValidators: true }) //update photo data in DB
    .then((updatedPhoto) => {res.json(updatedPhoto)})
    .catch((err) => {res.status(400).json(err);})
}); 

module.exports = {
    getallSingleFiles,
    recentlyUploaded,
    topLikes,
    singleFileUpload,
    getOneFile,
    searchFile,
    deleteOne,
    updateOne,
}