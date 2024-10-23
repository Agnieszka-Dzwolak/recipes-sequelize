import express from 'express';
import recipeControllers from '../controllers/recipeControllers.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

const {
    getAll,
    getById,
    getRecipeForm,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getByUser
} = recipeControllers;

// routes
router.get('/recipes', getAll);
router.get('/recipes/:id', getById);
router.get('/add-recipe', verifyToken, getRecipeForm);
router.post('/add-recipe', verifyToken, addRecipe);
router.put('/recipes/:id', verifyToken, updateRecipe);
router.delete('/recipes/:id', verifyToken, deleteRecipe);

router.get('/get-by-user', verifyToken, getByUser);
export default router;
