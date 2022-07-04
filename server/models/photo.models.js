const {Schema,model} = require('mongoose');

const singleFileSchema = new Schema({
    fileName: {
        type: String,
    },
    filePath: {
        type: String,
    },
    fileType: {
        type: String,
    }
}, {timestamps: true});

const Upload = model('Upload', singleFileSchema);

module.exports = Upload;