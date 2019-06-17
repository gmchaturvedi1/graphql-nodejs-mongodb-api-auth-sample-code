import { UserInputError } from 'apollo-server-core'
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'

const config = {
    secret: 'thisismysecret',
}
const tokenForUser = user => {
    //  console.log(user)
    const timeStamp = new Date().getTime()
    // return jwt.encode({sub:user.id,iat:timeStamp},config.secret);
    return jwt.sign({ subject: user._id, iat: timeStamp, expiresIn: '10000 days' }, config.secret)
}

module.exports = {
    Query: {
        contact: async (_, data, { models, authUser }, info) => {
            if (!authUser) {
                throw new UserInputError('Your are not authenticated')
                return null
            } else {
                //                const product = await models.product.find({ adminId: authUser._id });
                const contact = await models.contact.find({}).sort({ createdAt: -1 })
                return contact
            }
        },
        contactById: async (_, data, { models, authUser }, info) => {
            if (!authUser) {
                throw new UserInputError('Your are not authenticated')
                return null
            } else {
                const contact = await models.contact.findById(data._id)
                return contact
            }
        },
    },
    Mutation: {
        createContact: async (_, data, { models: { contact }, authUser }, info) => {
            const userGroup1 = await contact.find({ email: data.email })
            if (userGroup1.length > 0) {
                throw new UserInputError('contact already exist')
            } else {
                const contact1 = await contact.create({
                    email: data.email,
                    name: data.name,
                    subject: data.subject,
                    msg: data.msg,
                })
                return contact1
            }
        },
        updateContact: async (_, data, { models: { contact } }, info) => {
            const user1 = await contact.find({ _id: data._id })
            if (user1.length < 1) {
                throw new UserInputError('No contact  Found')
            } else {
                const contact1 = await contact.findByIdAndUpdate(
                    { _id: data._id },
                    {
                        $set: {
                            email: data.email,
                            name: data.name,
                            subject: data.subject,
                            msg: data.msg,
                        },
                    }
                )
                return contact1
            }
        },
        removeContact: async (_, data, { models: { contact }, authUser }, info) => {
            const user1 = await contact.findById(data._id)
            if (user1.length < 1) {
                throw new UserInputError('No contact Found')
            } else {
                const contact1 = await contact.findByIdAndRemove(data._id)
                return contact1
            }
        },
    },
}
