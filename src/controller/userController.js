const bcrypt = require('bcrypt') ;
const UserModel = require('../models/userSchema.js')

const signUpUser = async(req,res) => {
    try{
        const {username, password,email} = req.body ;

        const existingUser = await UserModel.findOne({email}) ;
        if (existingUser) {
            return res.status(400).json({ success: false, message :"Email already taken"}) ;

        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new UserModel({
            username,
            password: hashedPassword,
            email,
        });

        await newUser.save();


        console.log({message: "User Signed Up"});

        res.status(201).json({success: true ,message: "User Registered Successfully"}) ;

    } catch(error) {
        console.log("Error in signUpUser controller" ,error.message);
        res.status(500).json({ success:false, error: 'Internal Server Error'});
    }
};



const logInUser = async(req,res) => {
    try{
        const { username,password} =req.body ;

        const user = await UserModel.findOne({username});

        if (!user) {
            return res.json({ success:false,message: "Invalid Username"}) ;
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password) ;

        if(!isPasswordCorrect) {
            return res.json({success:false,message:"Invalid Password"}) ;
        }


        console.log({message:"User Logged In"});

        res.status(200).json({success:true, error: 'Login Successfully !'});

    } catch(error) {
        console.log("Error in login controller", error.message) ;
        res.status(500).json({success:false,error: 'Internal Server Error'});
    } 
};


const logOutUser = (req, res)=>{
    
    try {
        res.status(200).json({message:"Logged Out Successfully", success: true});
    } catch(error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: 'Internal Server Error'});
    } 
}

module.exports ={signUpUser,logOutUser,logInUser};