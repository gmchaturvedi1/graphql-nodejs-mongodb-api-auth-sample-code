import { UserInputError } from 'apollo-server-core'
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'

const config = {
    secret: 'thisismysecret',
}
const tokenForUser = user => {
    const timeStamp = new Date().getTime()
    // return jwt.encode({sub:user.id,iat:timeStamp},config.secret);
    return jwt.sign({ subject: user._id, iat: timeStamp, expiresIn: '10000 days' }, config.secret)
}

module.exports = {
    Query: {
        user: async (_, args, { models: { user }, authUser }, info) => {
            if (!authUser) {
                throw new UserInputError('Your are not authenticated')
                return null
            } else {
                return authUser
            }
        },
        users: async (_, args, { models: { user }, authUser }, info) => {
            if (!authUser) {
                throw new UserInputError('Your are not authenticated')
                return null
            } else {
                const user1 = await user.find({ url: authUser.url, role: 'user' })
                return user1
            }
        },
        userById: async (_, data, { models, authUser }, info) => {
            if (!authUser) {
                throw new UserInputError('Your are not authenticated')
                return null
            } else {
                const user1 = await models.user.findById(data._id)
                return user1
            }
        },
    },
    Mutation: {
        createUser: async (_, data, { models: { user } }, info) => {
            const user1 = await user.find({ email: data.email })
            if (user1.length > 0) {
                throw new UserInputError('Email Id already registered')
            } else {
                var salt = bcrypt.genSaltSync(10)
                var hash = bcrypt.hashSync(data.password, salt)
                const user1 = await user.create({
                    email: data.email,
                    password: hash,
                    name: data.name,
                    role: 'user',
                    mobileNumber: data.mobileNumber,
                    url: data.url,
                })
                return user1
            }
        },
        updateUser: async (_, data, { models: { user } }, info) => {
            const user1 = await user.find({ email: data.email })
            if (user1.length < 1) {
                throw new UserInputError('No User Found')
            } else {
                var salt = bcrypt.genSaltSync(10)
                var hash = bcrypt.hashSync(data.password, salt)
                const user1 = await user.findByIdAndUpdate(req.params.id, {
                    $set: {
                        email: data.email,
                        password: hash,
                        firstName: data.firstName,
                        lastName: data.lastName,
                    },
                })
                return user1
            }
        },
        removeUser: async (_, data, { models: { user } }, info) => {
            const user1 = await user.find({ email: data.email })
            if (user1.length < 1) {
                throw new UserInputError('No User Found')
            } else {
                const user1 = await user.findByIdAndRemove(req.params.id)
                return user1
            }
        },
        login: async (_, data, { models: { user } }, info) => {
            const user1 = await user.find({ email: data.email })
            if (user1.length > 0) {
                const comparePassword = bcrypt.compareSync(data.password, user1[0].password)
                if (comparePassword) {
                    const token = tokenForUser(user1[0])
                    return { user: user1[0], token }
                } else {
                    throw new UserInputError('Invalid email or password')
                }
            } else {
                throw new UserInputError('Email id does not exist')
                return null
            }
        },
        createUserFromAdmin: async (_, data, { models: { user }, authUser }, info) => {
            // console.log(data);
            const user1 = await user.find({ email: data.email })
            if (user1.length > 0) {
                throw new UserInputError('Email Id already registered')
            } else {
                var salt = bcrypt.genSaltSync(10)
                var hash = bcrypt.hashSync(data.password, salt)
                const user1 = await user.create({
                    email: data.email,
                    password: hash,
                    name: data.name,
                    adminId: authUser._id,
                    role: 'user',
                    mobileNumber: data.mobileNumber,
                    url: authUser.url,
                    userGroup: data.userGroup,
                })
                return user1
            }
        },
        updateUserFromAdmin: async (_, data, { models: { user }, authUser }, info) => {
            const user1 = await user.find({ _id: data._id })
            if (user1.length < 1) {
                throw new UserInputError('No User Found')
            } else {
                if (data.password) {
                    var salt = bcrypt.genSaltSync(10)
                    var hash = bcrypt.hashSync(data.password, salt)
                    const user4 = await user.findByIdAndUpdate(data._id, {
                        $set: {
                            password: hash,
                        },
                    })
                }
                const user1 = await user.findByIdAndUpdate(data._id, {
                    $set: {
                        email: data.email,
                        userGroup: data.userGroup,
                        mobileNumber: data.mobileNumber,
                        email: data.email,
                        name: data.name,
                    },
                })
                return user1
            }
        },
        removeUserFromAdmin: async (_, data, { models: { user } }, info) => {
            const user1 = await user.find({ _id: data._id })
            if (user1.length < 1) {
                throw new UserInputError('No User Found')
            } else {
                const user1 = await user.findByIdAndRemove(data._id)
                return user1
            }
        },
    },
}

// export {
//     ApolloError,
//     toApolloError,
//     SyntaxError,
//     ValidationError,
//     AuthenticationError,
//     ForbiddenError,
//     UserInputError,
//     gql
//   } from 'apollo-server-core'
