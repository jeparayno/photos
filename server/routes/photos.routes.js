const PhotoController = require('../controllers/photo.controllers');
const {upload} = require('../middlewares/multerMiddleware')

module.exports = (app) => {
    app.get('/api/photos/recent', PhotoController.recentlyUploaded);
    app.get('/api/photos/topLikes', PhotoController.topLikes);
    app.get('/api/photos/getSingleFiles', PhotoController.getallSingleFiles);
    app.post('/api/photos/singleFile',upload.single('file'),PhotoController.singleFileUpload);
    app.delete('/api/photos/singleFile/:photoId', PhotoController.deleteOneFile)
    app.get('/api/photos/getOneFile/:photoId', PhotoController.getOneFile);
    app.delete('/api/photos/deleteOne/:photoId', PhotoController.deleteOne)
}