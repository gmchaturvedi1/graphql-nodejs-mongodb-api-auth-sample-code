import type from './user.type'

export default {
    resolvers: require('./user.resolvers'),
    typeDefs: type,
    model: require('./user.model'),
}
