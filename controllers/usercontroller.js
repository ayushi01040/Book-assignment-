const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRound=10;

async function addUser(req, res) {
  try {
    
    const { email, password, confirmPassword } = req.body;
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already in use."); // Handle duplicate email
    }
    // If passwords match, proceed to create the new user
    if (password === confirmPassword) {
      let hashedPassword=bcrypt.hashSync(password,saltRound);
     
      let user = new User(req.body);
      user.password=hashedPassword;

      user.userType = 2; // Set userType or other defaults
      await user.save();
      res.render("signup"); // Render after successful registration
    } else {
      res.status(400).send("Passwords do not match."); // Handle password mismatch
    }
  } catch (err) {
    console.error("Something went wrong in usercontroller", err);
    res.status(500).send("Internal Server Error"); // Handle general errors
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    console.log("Logging in user with email:", email); // Debug log
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(401).send("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password); // Use bcrypt to compare
    if(isMatch){
      if(user.userType==1){
          res.render('adminpanel.ejs')

      }
      else{

          res.render('userpanel.ejs',{user});
      }
  }
  else{
      res.end("wrong password")
  }

  } catch (error) {
    console.error("Something went wrong while logging:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function getUsers(req, res) {
  try {
    let users = await User.find({}); // Fetch users from database
    // Check if users were found
    if (!users) {
      return res.status(404).send("No users found");
    }
    // Render the 'UserTable' EJS view, passing in the users data
    res.render("usertable", { users: users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    // Send a response to the client to indicate there was an error
    res.status(500).send("Internal Server Error");
  }
}
async function getprofile(req,res) {
  try{
    res.render('profile')

  }catch(err){
    console.log(err);
  }
  
}

async function getUserForEdit(req,res) {
  try{ 
      
      let id=req.params.id;
      let user=await User.findOne({ _id: id});
      console.log(user);
      res.render('userforedit',{
          user:user

      });

  }catch(err){
      console.log(err, 'err');
  }
}

async function updateUser(req,res) {
  try{ let id=req.params.id;
      console.log(req.body ,"request body")
      let user =await User.findOne({_id: id});
      console.log(user);
      user.firstName=req.body.firstName;
      user.lastName=req.body.lastName;
      user.country=req.body.country;
      user.emailId=req.body.emailId;
      user.mobileNo=req.body.mobileNo;
      // let hashedPassword=bcrypt.hashSync(req.body.password,saltRound);
      // user.password=hashedPassword;
      await user.save();
      let users=await User.findOne({_id:id});
      res.render('updateProfile.ejs',{
        user:users
      }) 
  }catch(err){
      console.log(err);
  }    
}
async function logoutUser(req,res) {
  req.session.destroy(() => {
    res.redirect('/');  // Redirect to the homepage after logout
});
  
}
async function deleteUser(req,res) {
  try{
      let id =req.params.id;
      
      await User.deleteOne({_id:id});
      let user= await User.find({});
      res.render('usertable',{
          users:user
      })


  }catch(err){
      console.log(err);
  }
  
}
async function userAccountSetting(req,res) {
  const id=req.params.id;
  let users= await User.findOne({_id: id});
  res.render('accountsetting.ejs',{
    user:users
  });
  
}
// async function deleteUser(req,res) {
//   try{
//       let id =req.params.id;
//       await User.deleteOne({_id:id});
//       let user= await User.find({});
//       res.render('usertable',{user})


//   }catch(err){
//       console.log(err);
//   }
  
// }
async function userPasswordChange(req,res) {
  const userId = req.params.id;
    const user = await User.findById(userId);  // Fetch user from database
    
    if (!user) {
        return res.status(404).send('User not found');
    }

    res.render('change-password.ejs', { user })
  
}
async function userUpdatePassword(req, res) {
  try {
    const userId = req.params.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send('Current password is incorrect');
    }

    // Validate new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    user.confirmPassword = confirmPassword; // Only store if necessary

    await user.save();

    // Render success page after password is updated
    res.render('password-updated.ejs',{user:user});

  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).send('Server error. Please try again later.');
  }
}



module.exports = {
  addUser,
  loginUser,
  getUsers,
  getprofile,
  deleteUser,
  updateUser,
  getUserForEdit,
  logoutUser,
  userAccountSetting,
  userPasswordChange,
  userUpdatePassword
}