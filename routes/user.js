const express = require("express");
const usercontroller = require("../controllers/usercontroller");

const router = express.Router();
router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/user/signup", (req, res) => {
  res.render("usersignup");
});

// Adding a user
router.post("/add/user", (req, res) => {
  usercontroller.addUser(req, res);
});

// login user & admin
router.post("/login", (req, res) => {
  usercontroller.loginUser(req, res);
});

// 
router.get("/users",(req, res) => {
  usercontroller.getUsers(req, res);
});
router.get('/profile',(req,res)=>{
  usercontroller.getprofile(req,res);
})

router.get('/edit/user/:id',(req,res)=>{
  usercontroller.getUserForEdit(req,res);
})
router.post('/update/user/:id',(req,res)=>{
  usercontroller.updateUser(req,res)

})
router.get('/logout', (req, res) => {
  // Destroy the session or clear authentication data
  usercontroller.logoutUser(req,res);
});

router.post('/delete/user/:id', async (req, res) => {
 
    usercontroller.deleteUser(req,res)
})
router.get('/user/settings/:id',(req,res)=>{
  usercontroller.userAccountSetting(req,res);
})
router.get('/change-password/user/:id', (req, res) => {
  usercontroller.userPasswordChange(req,res);
})
router.post('/update-password/user/:id', (req, res) => {
  try{
 usercontroller.userUpdatePassword(req,res);
  }
catch(err){
  console.log(err)
}
});


//exporting the module 
module.exports = router;
