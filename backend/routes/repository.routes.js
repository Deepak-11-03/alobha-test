const { getRepos, createRepo, renameRepo, deleteRepo } = require('../controllers/repository.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = require('express').Router()



router.get('/', authMiddleware,getRepos ) 
router.post('/', authMiddleware,createRepo) 
router.patch('/', authMiddleware,renameRepo) 
router.delete('/:id',authMiddleware, deleteRepo) 

module.exports = router