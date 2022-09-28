const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const errors = require('./errors')

exports.getProduct = async () => {
    const result = await Product.find({});

    return result;
}

exports.createProduct = async (product) => {
    const newProduct = new Product(product)
    await newProduct.save()

    return newProduct
}

exports.updateByProductId = async (id, product) => {
    const result = await Product.findByIdAndUpdate(id, product)

    if (!result) {
        throw errors.NotFound("Product not found in the database")
    }

    await result.save()

    return result
}

exports.deleteByProductId = async (id) => {
    const result = await Product.findByIdAndDelete(id)

    if (!result) {
        throw new errors.NotFound("Product not found in the database")
    }
}