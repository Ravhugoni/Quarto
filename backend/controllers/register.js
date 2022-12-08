const  bcrypt  =  require("bcrypt");
const  jwt  =  require("jsonwebtoken");

const pool = require("../connection/connection")

//Registration Function

const registerUser  =  async (req, res) => {
    const { fullname, email, phone, idNumber, password, address, docUrl, userType, status } =  req.body;
    try {
        const  data  =  await pool.query(`SELECT * FROM public.users WHERE email= $1;`, [email]); //Checking if user already exists
        const  arr  =  data.rows;

        if (arr.length  !=  0) {
            return  res.status(400).json({
            error: "Email already there, No need to register again.",
            });
        }
        else {
            bcrypt.hash(password, 10, (err, hash) => {
            if (err)
            res.status(err).json({
            error: "Server error",
            });
            const  user  = {
                fullname,
                email,
                phone,
                idNumber,
                password: hash,
                address,
                docUrl,
                userType,
                status

            };
            var  flag  =  1; //Declaring a flag

            //Inserting data into the database
            if(user.fullname !==  null && user.fullname !==  '' && user.email !==  null && user.email !==  '' && user.phone !==  null && user.phone !==  '' && user.password !==  null && user.password !==  '')
            {
                pool.query(`INSERT INTO public.users(fullname, email, phone, "idNumber", password, address, "docUrl", "userType", status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`, [user.fullname, user.email, user.phone, user.idNumber, user.password, user.address, user.docUrl, user.userType, user.status], (err) => {
                    if (err) {
                        flag  =  0; //If user is not inserted is not inserted to database assigning flag as 0/false.
                        console.error(err);
                        return  res.status(500).json({ error: "Database error"})
                    }
                    else {
                        flag  =  1;
                        res.status(200).send({ message: 'User added to database, not verified' });
                    }
                })
            }
           
            if (flag) {
            const  token  = jwt.sign( //Signing a jwt token
            {
            email: user.email
            },
            "process.env.SECRET_KEY"
            );
            };
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring user!", //Database connection error
        });
    };

}

module.exports = {
    registerUser
  }
