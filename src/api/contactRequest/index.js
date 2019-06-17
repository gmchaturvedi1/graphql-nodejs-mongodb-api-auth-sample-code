import type from './contact.type'

export default {
    resolvers: require('./contact.resolvers'),
    typeDefs: type,
    model: require('./contact.model'),
}
