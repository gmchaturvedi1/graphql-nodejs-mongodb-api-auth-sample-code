const type = `

type subscriber{
    id:ID
    email:String
}


extend type Query {
    subscriber:[subscriber]
  subscriberById(_id:String):subscriber
}

extend type Mutation {
    createSubscriber(name:String):subscriber
    updateSubscriber(_id:String,name:String):subscriber
    removeSubscriber(_id:String,):subscriber
}
`

export default type
