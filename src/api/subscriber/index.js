import type from './subscriber.type'

export default {
    resolvers: require('./subscriber.resolvers'),
    typeDefs: type,
    model: require('./subscriber.model'),
}
