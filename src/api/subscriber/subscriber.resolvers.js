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
        subscriber: async (_, data, { models, authUser }, info) => {
            if (!authUser) {
                throw new UserInputError('Your are not authenticated')
                return null
            } else {
                //                const product = await models.product.find({ adminId: authUser._id });
                const subscriber = await models.subscriber.find({}).sort({ createdAt: -1 })
                return subscriber
            }
        },
        subscriberById: async (_, data, { models, authUser }, info) => {
            if (!authUser) {
                throw new UserInputError('Your are not authenticated')
                return null
            } else {
                const subscriber = await models.subscriber.findById(data._id)
                return subscriber
            }
        },
    },
    Mutation: {
        createSubscriber: async (_, data, { models: { subscriber }, authUser }, info) => {
            const userGroup1 = await subscriber.find({ email: data.email })
            if (userGroup1.length > 0) {
                throw new UserInputError('subscriber already exist')
            } else {
                const subscriber1 = await subscriber.create({
                    email: data.email,
                })
                return subscriber1
            }
        },
        updateSubscriber: async (_, data, { models: { subscriber } }, info) => {
            const user1 = await subscriber.find({ _id: data._id })
            if (user1.length < 1) {
                throw new UserInputError('No subscriber  Found')
            } else {
                const subscriber1 = await subscriber.findByIdAndUpdate(
                    { _id: data._id },
                    {
                        $set: {
                            email: data.email,
                        },
                    }
                )
                return subscriber1
            }
        },
        removeSubscriber: async (_, data, { models: { subscriber }, authUser }, info) => {
            const user1 = await subscriber.findById(data._id)
            if (user1.length < 1) {
                throw new UserInputError('No subscriber Found')
            } else {
                const subscriber1 = await subscriber.findByIdAndRemove(data._id)
                return subscriber1
            }
        },
    },
}
