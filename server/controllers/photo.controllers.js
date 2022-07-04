const PhotoModel = require('../models/photo.models');
const fs = require("fs");

const connectionCheck =((req,res)=>{
    res.json({ message: "Connection is properly Working.. for now.." });
})

const getallSingleFiles =  ((req, res,next) => {
    PhotoModel.find()
    .then((allPhotos)=>{
        res.json(allPhotos)})
    .catch((err)=>res.json(err))
})

const singleFileUpload = ((req, res)=>{
    console.log(req.file.path)
    const file = {
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
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

const deleteAllFiles = ((req,res)=>{
    PhotoModel.deleteMany({})
    .then((deletedPhotos)=>res.json(deletedPhotos))
    .catch((err)=>console.log(err))
})

module.exports = {
    connectionCheck,
    singleFileUpload,
    getallSingleFiles,
    deleteAllFiles,
    deleteOneFile,
}