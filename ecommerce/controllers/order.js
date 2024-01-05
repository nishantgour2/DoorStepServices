const {Order,CartItem} = require("../models/order")
const {errorHandler} = require('../helpers/dbErrorHandler')
const sgMail = require('@sendgrid/mail')
exports.orderById = (req,res,next,id) => {
    Order.findById(id)
    .populate('products.product','name price')
    .exec((err,order) => {
        if(err || !order){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        req.order = order
        next()
    })
}

exports.create = (req,res) => {
    console.log("CREATE ORDER: ",req.body)
    // console.log("CREATE ORDER1: ",req.profile)

    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((error,data) => {
        if(error){
            return res.status(400).json({
                error:errorHandler(error)
            })
        }
        res.json(data)
    })
};


exports.listOrder = (req,res) => {
    Order.find()
    .populate('user',"_id name address")
    .sort('-created')
    .exec((err,orders) => {
        if(err){
            return res.status(400).json({
                error:errorHandler(error)
            })
        }
        res.json(orders)
    } )
}



exports.getStatusValues  = (req,res) => {
    res.json(Order.schema.path('status').enumValues);
}


exports.updateOrderStatus = (req,res) => {
    Order.update(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,order) => {
            if(err){
                return res.status(400).json({
                    error:errorHandler(error)
                })
            }
            req.order = order
              
        }
    )
}


// ___________________________________________________________________________-
// ____________________________________________________________________________
// / require on top
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey('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');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// your create order method with email capabilities
exports.create = (req, res) => {
    console.log('CREATE ORDER: ', req.body);
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        // User.find({ categories: { $in: categories } }).exec((err, users) => {}
        console.log('ORDER IS JUST SAVED >>> ', order);
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount
        const emailData = {
            to: 'nishant.gour419@gmail.com', // admin
            from: 'nishant.gour007@gmail.com',
            subject: `A new order is received`,
            html: `
            <h1>Hey Admin, Somebody just made a purchase in your ecommerce store</h1>
            <h2>Customer name: ${order.user.name}</h2>
            <h2>Customer address: ${order.address}</h2>
            <h2>User's booking history: ${order.user.history.length} purchase</h2>
            <h2>User's email: ${order.user.email}</h2>
            
            <h2>Transaction ID: ${order.transaction_id}</h2>
            <h2>Order status: ${order.status}</h2>
            <h2>Service Provider details:</h2>
            <hr />
            ${order.providers
                .map(p => {
                    return `<div>
                        <h3>Service Provider Name: ${p.name}</h3>
                        
                </div>`;
                })
                .join('--------------------')}
            <h2>Booking Charge: ${order.amount}<h2>
            <p>Login to your dashboard</a> to see the order in detail.</p>
        `
        };
        sgMail
            .send(emailData)
            .then(sent => console.log('SENT >>>', sent))
            .catch(err => console.log('ERR >>>', err));

        // email to buyer
        const emailData2 = {
            to: order.user.email,
            from: 'nishant.gour007@gmail.com',
            subject: `You order is in process`,
            html: `
            <h1>Hey ${req.profile.name}, Thank you for using out platform | Your request has been received.</h1>
            
            <h2>Transaction ID: ${order.transaction_id}</h2>
            <h2>Order status: ${order.status}</h2>
            <h2>Provider details:</h2>
            <hr />
            ${order.providers
                .map(p => {
                    return `<div>
                        <h3>Provider Name: ${p.name}</h3>

                </div>`;
                })
                .join('--------------------')}
            <h2>Total Booking cost: ${order.amount}<h2>
            <p>Thank your for shopping with us.</p>
        `
        };
        sgMail
            .send(emailData2)
            .then(sent => console.log('SENT 2 >>>', sent))
            .catch(err => console.log('ERR 2 >>>', err));

        res.json(data);
    });
};