
const uploadImage = async(req,res,next) => {
    try {
        if (!req.file) {
            return res.status(403).json({
                message: 'No file uploaded'
            });
        }

        res.status(201).json({
            message: 'Success uploaded',
            data: {src: `http://localhost:3000/upload/post/${req.file.filename}`},
        })

    } catch (err) {
        next(err)
    }
}

const uploadPhoto = async(req,res,next) => {
    try {
        if (!req.file) {
            return res.status(403).json({
                message: 'No file photo uploaded'
            });
        }

        res.status(201).json({
            message: 'Success uploaded',
            data: {src: `http://localhost:3000/upload/photo/${req.file.filename}`},
        })

    } catch (err) {
        next(err)
    }
}

module.exports = {uploadImage,uploadPhoto}