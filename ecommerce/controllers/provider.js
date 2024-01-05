const formidable = require('formidable');
const _ = require("lodash");
const fs = require('fs')  
const Provider = require('../models/provider');
const { errorHandler } = require('../helpers/dbErrorHandler');


exports.providerById = (req,res,next,id) => {

    Provider.findById(id)
    .populate("category")
    .exec((err, provider) =>{
            if(err || !provider){
                return res.status(400).json({
                    error : "Service Provider Not Found !"
                });
            }

            req.provider = provider;
            next(); 

    });

};


exports.read = (req,res) => {
    req.provider.photo = undefined
    return res.json(req.provider)
}




exports.create = (req,res) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files) =>{
        if(err) {
            // console.log(err);
            return res.status(400).json({
                error:"Image could not be uploaded"
            })
        }

        // check for all fields
        const {name,description,category,service_avail,address} = fields

        if(!name || !description || !category || !service_avail || !address ){
            return res.status(400).json({
                error:"All Fields Are Required !"
            });

        }


        let provider = new Provider(fields) 
// 1 kb = 1000
// 1 mb = 1000000

        if(files.photo){

            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error:"Image size should be less than 1 mb"
                });
            }

            provider.photo.data = fs.readFileSync(files.photo.path)
            provider.photo.contentType = files.photo.type
        }

        provider.save((err,result) => {
            if(err){
                return res.status(400).json({
                    error:errorHandler(error)
                }); 
            }

            res.json(result);

        })

    })
    
};


// remove

exports.remove =(req,res) => {

    let provider = req.provider
    provider.remove((err,deletedProvider) =>{

        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }

        res.json({
            deletedProvider,
            "message": "Provider deleted !"
        })
        
    } )

};


exports.update = (req,res) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files) =>{
        if(err) {
            // console.log(err);
            return res.status(400).json({
                error:"Image could not be uploaded"
            })
        }

        // check for all fields
        const {name,description,category,service_avail,address} = fields

        if(!name || !description || !category || !service_avail || !address ){
            return res.status(400).json({
                error:"All Fields Are Required !"
            });

        }


        let provider = req.provider 
        provider - _.extend(provider,fields)
// 1 kb = 1000
// 1 mb = 1000000

        if(files.photo){

            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error:"Image size should be less than 1 mb"
                });
            }

            provider.photo.data = fs.readFileSync(files.photo.path)
            provider.photo.contentType = files.photo.type
        }

        provider.save((err,result) => {
            if(err){
                return res.status(400).json({
                    error:errorHandler(error)
                }); 
            }

            res.json(result);

        })

    })
    
};



/**
 * Show Certain 
 * Dukaan on the basis of there service Frequence & New Services
 * by worked = /providers?sortBy=worked&order=desc&limit=4
 * by arrival = /providers?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, them all provider are returned
 */

 exports.lista = (req,res) => {  
    
     let order = ''
     let sortBy = ''
     let limit = parseInt(req.query.limit)
    console.log(req.query.order)
     
     if (req.query.order){
         order = req.query.order
     }
     else{
         order = 'asc'
     }

     if (req.query.sortBy){
        sortBy = req.query.sortBy
    }
    else{
        sortBy = '_id'
    }
    
     

    console.log(typeof order)
    console.log(typeof sortBy)

     Provider.find()
     .select("-photo")
     .populate("category")
     .sort([[sortBy, order]])
     .limit(limit)
     .exec((err, providers) => {
         if (err) {
             return res.status(400).json({
                 error: "providers not found"
             });
         }
         res.json(providers);
     });
};

//  ek jaisi dukaan
// it will find the product based on the req category
// other products that has the same category, will be returned

exports.relatedList = (req,res) => {

    let limit =0
    if(limit) { 
       limit= parseInt(req.query.limit)
    }
    else{limit=6}

 Provider.find({_id:{$ne:req.provider},category:req.provider.category })
    .limit(limit)
    .populate('category','_id name')
    .exec((err,providers) =>{
        if (err) {
            return res.status(400).json({
                error: "providers not found"
            });
        }
        res.json(providers);
        
    } );
};

// End of related list
exports.listCategories = (req,res) => {

    Provider.distinct("category",{},(err,categories)=>{
        if (err) {
            return res.status(400).json({
                error: "categories  not found"
            });
        }
        res.json(categories);
    } )

}

// Dukaan waale search karke dhundne ke lie ye function call hoga

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

// route - make sure its post

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "worked") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Provider.find(findArgs) 
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])  
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Provider not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};



exports.photo = (req,res,next) => {
    console.log('photo')
    if(req.provider.photo.data){
        res.set('Content-Type',req.provider.photo.contentType)
        return res.send(req.provider.photo.data)

    }
    next();
}





exports.listSearch = (req,res) => {
    // create query object to hold search balue and acategory value
    const query = {}

    // assign search value to query.value

    if(req.query.search){
        query.name = {$regex: req.query.search, $options:'i'}
        // assign category value to querey.category

        if(req.query.category && req.query.category != 'All'){
            query.category = req.query.category
        }
        //  Find the product based on query object with 2 properties 
        // search and category
        Provider.find(query,(err,providers) => {
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            res.json(providers)

        }).select('-photo')
    }

}



exports.increaseworked = (req,res,next)=> {
    let bulkOps = req.body.order.providers.map((item) => {
        return {
            updateOne:{
                filter:{_id:item._id},
                update:{$inc:{worked:+item.count}}
            }
        }
    })

    Provider.bulkWrite(bulkOps,{},(error,providers) =>{
        if (error){
            return res.status(400).json({
                error:'could not update provider'
            })
        }
        next();
    } )
}