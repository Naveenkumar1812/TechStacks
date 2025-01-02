const express = require('express');
const router = express.Router();  // This should be defined here
const Category  = require ('../models/Category');

// Getting all categories
router.get('/', async(req, res) =>{
    try {
        const categories = await Category.find();
        res.json(categories)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// Get a single category by ID
router.get('/:id', async(req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({message: "Category not found"});
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})


// Create a new category
router.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description,
    });

    try {
        const newCategory = await category.save(); // Use 'category' instead of 'post'
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// Update an existing category
// Update an existing category
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Update fields only if provided in the request body
        category.name = req.body.name || category.name;
        category.slug = req.body.slug || category.slug; // Correctly use req.body.slug for slug
        category.description = req.body.description || category.description; // Use description field properly
        category.updatedAt = Date.now();

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Delete a category
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await Category.findByIdAndDelete(category._id);
        res.json({ message: "Category deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
module.exports = router;
