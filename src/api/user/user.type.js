const type = `


type User{
    id: ID
     _id:String
     gender:String
     name:String
     userStatus:String
     mobileNumber:  String
     role:String
     password:String
     email: String
     emailVerified: String
     mobileVerified: String
     mobileOtpSent: String
     mobileOtp: String
     photo: String
     emailVerifyCode: String
     adminId: String
     url: String
     forgetPasswordLink:String,
    adminid:String
    }


type userResponse{
    user:User
    token:String

}


type Query {
    user:User
    users:[User]
    userById(_id:String):User
}

type Mutation {
    createUser(email:String,name:String,mobileNumber:String,password:String,url:String,):User
    updateUser(_id:String,email:String,name:String,mobileNumber:String,password:String,url:String,):User
    removeUser(_id:String,):User
    login(email:String,password:String):userResponse
    createUserFromAdmin(email:String,name:String,mobileNumber:String,password:String,url:String,):User
    updateUserFromAdmin(_id:String,email:String,name:String,mobileNumber:String,password:String,url:String,):User
    removeUserFromAdmin(_id:String,):User
}
`

export default type
