import user from './user'
import subscriber from './subscriber'
import contact from './contactRequest'

const loaders = require('./loaders')
const merge = require('lodash/merge')
import Auth from '../authenticate'
import model from './user/user.model'
// import { crunch } from 'graphql-crunch';
// import url from 'url';
// import querystring from 'querystring';

const context = async ({ request }) => {
    const authUser = await Auth(request ? request.headers.authorization : null, model)
    const ctx = {
        ...request,
        models: {
            user: user.model,
            subscriber: subscriber.model,
            contact: contact.model,
        },
        loaders: loaders(),
        authUser: authUser,
    }
    // const qs = querystring.parse(request.url);
    // if (process.env.NODE_ENV === 'development' && request.headers['x-timestamp']) {
    //   ctx.timestamp = moment(request.headers['x-timestamp']);
    // }
    return ctx
}

module.exports = {
    typeDefs: [user.typeDefs, subscriber.typeDefs, contact.typeDefs].join(' '),
    resolvers: merge({}, user.resolvers, subscriber.resolvers, contact.resolvers),
    context: context,
}
