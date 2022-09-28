const mongoose = require('mongoose');
const repository = require('../repositories/category-repository')
const errors = require('../repositories/errors')

exports.get = async(req, res, next)=> {
    const data = await repository.getCategory();
    res.status(200).send(data);
}

exports.create = async(req, res, next)=> {
    category = getAllowedFields(req)

    try{
        const data = await repository.createCategory(category);
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.update = async(req, res, next)=> {
    category = getAllowedFields(req)

    try {
        const data = await repository.updateByCategoryId(req.params.id, category);
        res.status(200).send(data);
    } catch (error) {

        if (error?.code === errors.CODE_NOT_FOUND) {
            res.status(404).send()
            return
        }

        res.status(500).send(error);
    }
    
}

exports.delete = async(req, res, next)=> {
    try {
        const data = await repository.deleteByCategoryId(req.params.id);
        res.status(200).send(data);
    } catch (error) {

        if (error?.code === errors.CODE_NOT_FOUND) {
            res.status(404).send()
            return
        }

        res.status(500).send(error);
    }
    
}

const getAllowedFields = (req) => {
    const { body } = req
    return {
        title: body.title,
        description: body.description
    }
}