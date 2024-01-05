exports.userSignupValidator = (req,res,next) => {
    req.check('name','Name is Required :( ').notEmpty()
    req.check('email','Email must be between 3 to 32 charcter')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must Contain @ :( ')
    .isLength({
        min :4,
        max:32
    });

    req.check('password','Password is required ').notEmpty()
    req.check('password')
    .isLength({min:6})
    .withMessage('password must be 6 char long')
    .matches(/\d/)
    .withMessage("Password must contain a number");
    const errors = req.validationErrors()
    if (errors){
        const firstError = errors.map(error=> error.msg)[0];
        return res.status(400).json({error:firstError});

    }
    next();

};