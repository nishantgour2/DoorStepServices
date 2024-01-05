const express = require("express");
const router = express.Router();

const {create , 
    providerById, 
    read,remove, 
    update,
    lista,
    relatedList,
    listCategories,
    listBySearch,
    photo,
    listSearch

} = require("../controllers/provider");
const { requireSignin,isAuth,isAdmin } = require("../controllers/auth");
const {userById } = require("../controllers/user");



router.get('/provider/:providerId',read);
router.get("/providers/search", listSearch);
router.post("/provider/create/:userId",requireSignin,isAuth,isAdmin,create);
router.delete('/provider/:providerId/:userId',requireSignin,isAuth,isAdmin,remove)
router.put('/provider/:providerId/:userId',requireSignin,isAuth,isAdmin,update)
router.post("/providers/by/search", listBySearch);
router.get('/provider/photo/:providerId',photo)




router.get('/providers',lista);
router.get("/providers/related/:providerId",relatedList)
router.get('/providers/categories',listCategories)


router.param("userId",userById);
router.param("providerId",providerById);




module.exports = router;
