//db connection
const dbConnection = require("../db/dbConfig")




async function register(req,res) {
    const { username, firstname, lastname, email, password} = req.body;
    if (!email|| !password|| !firstname || !lastname || !username){
        return res.status(400).json({msg:"please provide all required field"})
    }

    try {

        const [user] = await dbConnection.query("select username,userid from users where username=? or email=?",[username,email])
        if (user.length > 0){
            return res.status(400).json({msg:"user already registered"})
        }

        if (password.length <=8 ){
            return res.status(400).json({msg:"password must be at least 8 characters"})
        }

        await dbConnection.query(
            "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
            [username, firstname, lastname, email, password]
          );
      
          return res.status(201).json({ msg: "User registered successfully" });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({msg:"something wen wrong,try again later!"})
        
    }
    
}


async function login(req,res) {
    res.send("login")
    
}

async function checkUser(req,res) {
    res.send("check user")
    
}

module.exports = {register, login, checkUser}