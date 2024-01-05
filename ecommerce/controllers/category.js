const Category = require('../models/category');
const {errorHandler} = require('../helpers/dbErrorHandler');
// const category = require('../models/category');




exports.categoryById = (req,res,next,id) => {

    Category.findById(id).exec((err,category) => {
        if(err || !category){
            return res.status(400).json({
                error: 'Category Does not Exist !'
            });
        }
        req.category = category
        next();
    });
}



// create method start
exports.create = (req,res) =>{

    const category = new Category(req.body)
    category.save((err,data) => {
        if(err){
            return res.status(400).json({
                // error: errorHandler(err)
                error: ("Category already Exists  😢")
                // console.log('create function in category .js')

            });

        }
            res.json({data});
    })
}
// create method end


// Read method start
exports.read = (req,res) => {
    // req.provider.photo = undefined
    return res.json(req.category)
}
// end


// Update Method start
exports.update = (req,res) => {
    const category = req.category
    category.name = req.body.name
    category.save((err,data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    })

}

// end of update method



exports.remove = (req,res) => {
    const category = req.category
    // category.name = req.body.name
    category.remove((err,data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message : "Category Deleted !! Success 😁"
        });
    })

}
// end of remove method



exports.list = (req,res) => {
    
    Category.find().exec((err,data) => {
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
         res.json(data);
    })

}