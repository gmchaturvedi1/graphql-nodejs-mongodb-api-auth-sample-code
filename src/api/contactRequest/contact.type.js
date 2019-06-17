const type = `


type contact {
id:ID
    email:String,
name:String,
subject:String,
msg:String

}


extend type Query {
    contact:[contact]
  contactById(_id:String):contact
}

extend type Mutation {
    createContact(name:String):contact
    updateContact(_id:String,name:String):contact
    removeContact(_id:String,):contact
}
`

export default type
