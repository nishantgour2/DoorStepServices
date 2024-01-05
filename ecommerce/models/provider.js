const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const providerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },

        description: {
            type: String,
            required: true,
            maxlength: 2000
        },

        address: {
            type: String,
            required: true,
            maxlength: 500
        },

        category: {
            type: ObjectId,
            ref: 'Category',
            required: true
        },

        worked : {
            type : Number,
            default : 0
        },

        photo : {
            data : Buffer,
            contentType : String
        }, 
        
        service_avail : {
            required:false,
            type:Boolean

        }

        
    },
    { timestamps: true }
);


module.exports = mongoose.model("Provider", providerSchema);
