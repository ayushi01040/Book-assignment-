const signup=require('../models/User');
const bcrypt=require('bcrypt');
const saltRound=10;
async function createadmin() {
    try{
        let password=bcrypt.hashSync("123456",saltRound);
        let User={
            firstName:'admin',
            email:'admin@rdec.in',
            password: password,
            userType: 1
        }
        let user=new signup(User);
        await user.save();
        console.log("Admin has been created successfully")

    }catch(err){
        console.log(err);
    }
    
}
module.exports={
    createadmin
}