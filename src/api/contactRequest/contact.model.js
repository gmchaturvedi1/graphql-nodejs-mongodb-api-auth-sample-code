const mongoose = require('mongoose')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email)
}

const contactSchema = new mongoose.Schema(
    {
        email: String,
        name: String,
        subject: String,
        msg: String,
    },
    { timestamps: true }
)

contactSchema.index({ email: 1 })

module.exports = mongoose.model('contact', contactSchema)
