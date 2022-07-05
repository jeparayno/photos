const PhotoController = require('../controllers/photo.controllers');
const {upload} = require('../middlewares/multerMiddleware')

module.exports = (app) => {
    app.get('/api/photos/getSingleFiles', PhotoController.getallSingleFiles);
    app.get('/api/photos/recent', PhotoController.recentlyUploaded);
    app.get('/api/photos/topLikes', PhotoController.topLikes);
    app.post('/api/photos/singleFile',upload.single('file'),PhotoController.singleFileUpload);
    app.get('/api/photos/getOneFile/:photoId', PhotoController.getOneFile);
    app.get('/api/photos/getOneFile/:description', PhotoController.searchFile);
    app.delete('/api/photos/deleteOne/:photoId', PhotoController.deleteOne);
    app.put('/api/photos/updateOne/:photoId', PhotoController.updateOne);
}