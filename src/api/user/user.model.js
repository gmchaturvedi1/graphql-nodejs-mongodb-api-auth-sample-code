const mongoose = require('mongoose')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email)
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            required: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
            unique: true,
            name: 'email',
            index: true,
        },
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
        },
        adminId: {
            type: String,
        },
        userGroup: { label: String, value: String },

        mobileNumber: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: 'Please enter your Password ',
        },
    },
    { timestamps: true }
)

userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('email:email must be unique'))
    } else {
        next(error)
    }
})

userSchema.index({ email: 1 })

module.exports = mongoose.model('user', userSchema)
