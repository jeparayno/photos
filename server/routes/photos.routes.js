const PhotoController = require('../controllers/photo.controllers');
const {upload} = require('../middlewares/multerMiddleware')

module.exports = (app) => {
    app.get('/api/checkConnection', PhotoController.connectionCheck);
    app.get('/api/photos/getSingleFiles', PhotoController.getallSingleFiles);
    app.post('/api/photos/singleFile',upload.single('file'),PhotoController.singleFileUpload);
    app.delete('/api/photos/allPhotos', PhotoController.deleteAllFiles)
    app.delete('/api/photos/singleFile/:photoId', PhotoController.deleteOneFile)
}