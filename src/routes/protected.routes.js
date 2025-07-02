const express = require('express');
const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');
const ProtectedController = require('../controllers/protected.controller');
const router = express.Router();

router.get('/dashboard', authenticateToken, ProtectedController.dashboard);
router.get('/admin', authenticateToken, authorizeRole('admin'), ProtectedController.adminOnly);
router.get('/users', authenticateToken, authorizeRole('admin'), ProtectedController.getUsers);
router.get('/users/:id', authenticateToken, ProtectedController.findById);
router.put('/users/:id', authenticateToken, ProtectedController.updateUser);
router.delete('/users/:id', authenticateToken, authorizeRole('admin'), ProtectedController.deleteById);
router.get('/pets', authenticateToken, authorizeRole('admin'), ProtectedController.getPets);
router.get('/pets/:id', authenticateToken, authorizeRole('admin'), ProtectedController.findPetById);
router.post('/pets', authenticateToken, authorizeRole('admin'), ProtectedController.registerPet);
router.put('/pets/:id', authenticateToken, authorizeRole('admin'), ProtectedController.updatePet);
router.delete('/pets/:id', authenticateToken, authorizeRole('admin'), ProtectedController.deletePetById);
router.get('/adoptions', authenticateToken, authorizeRole('admin'), ProtectedController.getAdoptions);
router.post('/adoptions', authenticateToken, ProtectedController.registerAdoption);

module.exports = router;
