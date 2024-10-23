import db from '../models/index.js';

const Recipe = db.recipes;

const recipeControllers = {
    getAll: async (req, res) => {
        const token = req.cookies.token;
        try {
            const recipes = await Recipe.findAll();
            res.status(200).render('recipes', { recipes, token });
        } catch (err) {
            res.status(500).render('404', {
                title: 'Server error',
                message: 'Server error'
            });
        }
    },
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const recipe = await Recipe.findOne({ where: { id: id } });
            if (recipe) {
                res.status(200).render('recipe', { recipe });
            } else {
                res.status(400).render('404', {
                    title: 'Recipe not found',
                    message: 'Recipe not found'
                });
            }
        } catch (err) {
            res.status(500).render('404', {
                title: 'Server error',
                message: 'Server error'
            });
        }
    },
    getRecipeForm: (req, res) => {
        res.status(200).render('recipe-form');
    },
    addRecipe: async (req, res) => {
        const { title, ingredients, description, img } = req.body;
        const id = req.cookies.id;
        try {
            const newRecipe = await Recipe.create({
                title: title,
                ingredients: ingredients,
                description: description,
                img: img,
                user_id: id
            });
            res.status(200).render('recipe', { recipe: newRecipe });
        } catch (err) {
            console.error(err);
            res.status(500).render('404', {
                title: 'Server error',
                message: 'Server error'
            });
        }
    },
    updateRecipe: async (req, res) => {
        const { id } = req.params;
        const { title, ingredients, description, img } = req.body;

        try {
            const updatedRecipe = await Recipe.update(
                {
                    id: id,
                    ingredients: ingredients,
                    description: description,
                    img: img
                },
                { where: { id: id } }
            );
            res.status(302).redirect('/api/recipes');
        } catch (err) {
            console.error(err);
            res.status(500).render('404', {
                title: 'Server error',
                message: 'Server error'
            });
        }
    },
    deleteRecipe: async (req, res) => {
        const { id } = req.params;

        try {
            await Recipe.destroy({ where: { id: id } });
            res.status(302).redirect('/api/recipes');
        } catch (err) {
            console.error(err);
            res.status(500).render('404', {
                title: 'Server error',
                message: 'Server error'
            });
        }
    },
    getByUser: async (req, res) => {
        const { id, token } = req.cookies;

        try {
            const recipes = await Recipe.findAll({ where: { user_id: id } });
            res.status(200).render('recipes', { recipes, token: token });
        } catch (err) {
            console.error(err);
            res.status(500).render('404', {
                title: 'Server error',
                message: 'Server error'
            });
        }
    }
};

export default recipeControllers;
