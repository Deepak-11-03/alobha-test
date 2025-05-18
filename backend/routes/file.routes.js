const { uploadFile, getRepoFiles, getFileHistory, downloadFileVersion } = require('../controllers/file.controller')
const authMiddleware = require('../middleware/auth.middleware')
const multer = require('multer')
const router = require('express').Router()
const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB limit


router.post('/upload/:repoId',authMiddleware,upload.single('file'), uploadFile ) 
router.get('/repo/:repoId',authMiddleware, getRepoFiles) 
router.get('/:fileId/history',authMiddleware, getFileHistory) 
router.get('/:fileId/version/:version',authMiddleware, downloadFileVersion) 

module.exports = router