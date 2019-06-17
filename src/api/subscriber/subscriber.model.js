const mongoose = require('mongoose')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email)
}

const subscriberSchema = new mongoose.Schema(
    {
        email: String,
    },
    { timestamps: true }
)

subscriberSchema.index({ email: 1 })

module.exports = mongoose.model('subscriber', subscriberSchema)
