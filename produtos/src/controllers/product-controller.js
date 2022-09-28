const mongoose = require('mongoose');
const repository = require('../repositories/product-repository')
const errors = require('../repositories/errors')
const http = require('http');

exports.get = async(req, res, next)=> {
    const data = await repository.getProduct();
    res.status(200).send(data);
}

exports.create = async(req, res, next)=> {
    email = req.body.email
    product = getAllowedFields(req)

    try{
        const data = await repository.createProduct(product);
        notifyByEmail(email, product, () => {
            res.status(201).send(data);
        })
    } catch (error) {
        res.status(500).send(error);
    }

}

exports.update = async(req, res, next)=> {

    product = getAllowedFields(req)

    try {
        const data = await repository.updateByProductId(req.params.id, product);
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
        const data = await repository.deleteByProductId(req.params.id);
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
        description: body.description,
        price: body.price,
        active: body.active
    }
}

const notifyByEmail = (email, product, onEnd) => {
    var data = JSON.stringify({
        to: email,
        subject: `Você comprou o produto ${product.title}`,
        body: `Detalhes do produto \n - Nome: ${product.title} \n - Descrição: ${product.description} \n - Preço: ${product.price}`
      });
    
      var options = {
        host: 'emailsvc',
        port: 8080,
        path: '/send',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        }
      };
    
      var httpreq = http.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          console.log("body: " + chunk);
        });
        response.on('end', function() {
            onEnd()
        })
      });
      httpreq.write(data);
      httpreq.end();
}