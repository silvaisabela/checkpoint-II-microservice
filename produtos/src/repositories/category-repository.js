const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const errors = require('./errors')


exports.getCategory = async () => {
    const result = await Category.find({});

    return result;
}

exports.createCategory = async (category) => {
    const newCategory = new Category(category)
    await newCategory.save()

    return newCategory
}

exports.updateByCategoryId = async (id, category) => {
    const result = await Category.findByIdAndUpdate(id, category)

    if (!result) {
        throw new errors.NotFound("Category not found in the database")
    }

    await result.save()

    return result
}

exports.deleteByCategoryId = async (id) => {
    const result = await Category.findByIdAndDelete(id)

    if (!result) {
        throw new errors.NotFound("Category not found in the database")
    }
}