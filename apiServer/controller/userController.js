const user = require('../models/Users');
let roles = require("../models/Roles")
var jwt = require("jsonwebtoken");
const HashPassword = require("../helper/password").HashPassword
const verifyHashPassword = require("../helper/password").verifyHashPassword
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const axios = require("axios")
const qs = require('qs')


// -------------------------------------create Users ------------------------------------------------------

const addUser = async (req, res) => {
    try {
        const requredField = [
            "first_name",
            "email",
            "phone_number",
            "password"
        ]
        requredField.forEach(value => {
            if (!req.body[value] || req.body[value].trim() == "") {
                return res.status(400).json({ error: "Required Field is Empty" });
            }
        });
        let hashedPassword = HashPassword(req.body.password);

        const existingUserValue = await user.findOne({
            where: { phone_number: req.body.phone_number, email:req.body.email }
        });
        if (existingUserValue) {
            return res.status(400).json({ error: "User already exists with this phone number" })
        }
        let createdUser = await user.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            image_url: req.body.image_url ? req.body.image_url : null,
            password: hashedPassword.hash,
            password_salt: hashedPassword.salt,
            token: crypto.randomBytes(32).toString("hex")
        })
        if (createdUser) {
            const url = `${process.env.BASE_URL}/api/users/${createdUser.id}/verify/${createdUser.token}`
            sendEmail(req.body.email, url)
            res.status(200).json(createdUser)
        }
        else
            res.status(400).json({ Error: 'Error in insert new record' });
    }
    catch
    (error) {
        res.status(500).json({ error: error });
    }
}

// --------------------------------------------- List ------------------------------------------------------

const getUsers = async (req, res) => {
    // try {
        const currentPage = req.query.page || 1;
        const itemsPerPage = 6;
        const offset = (currentPage - 1) * itemsPerPage;

        const userslist = await user.findAndCountAll({
            include: [{
                model: roles,
                attributes: ['role_name'],
                required: true,
            }],
            offset,
            limit: itemsPerPage,
        }
        );
        res.json(userslist);
    // } catch (error) {
    //     res.status(500).json({ error: "con't Retrieving values" });
    // }
}

// --------------------------------------------- List By Id ------------------------------------------------

const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const singleUser = await user.findByPk(userId, {
            include: [{
                model: roles,
                attributes: ['role_name'],
                required: true,
            }]
        });
        if (singleUser) {
            res.status(200).json(singleUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the user' });
    }
}

// -------------------------------------------- Upadate User Details ---------------------------------------

const putUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const UserDetails = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            image_url: req.body.image_url ? req.body.image_url : null
        }
        const updatedUser = await user.update(UserDetails, {
            where: { id: userId },
        });
        if (updatedUser) {

            res.status(200).json({ message: 'User Details updation successfully', UserDetails });
        } else {

            res.status(404).json({ error: `User not found ${userId}` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};


// -------------------------------------------- Delete USer ------------------------------------------------

const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId, "userId in List page");
        const deletedUser = await user.destroy({
            where: { id: userId },
        });
        console.log(deletedUser, "deleted User in the List page");

        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully', success: true });
        } else {
            res.status(404).json({ error: `User not found ${userId}`, success: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user', success: false });
    }
};

// ---------------------------------------------Login-------------------------------------------------------

const login = async (req, res) => {
    try {
        let fields = ["email", "password"];
        fields.map((item) => {
            if (!req.body[`${item}`]) {
                let userdetails = { message: `${item}"is required"`, code: 400 }
                res.status(200).json({ userdetails, sucess: true });
            }
        })
        const users = await user.findOne({
            where: { email: req.body.email },
            include: [{
                model: roles,
                attributes: ['role_name'],
                required: true,
            }]
        });
        if (users && users.verify) {
            const secret = await verifyHashPassword(req.body.password, users.password_salt);
            //------------------ Tocken generation used user details -----------------------
            if (secret.hash === users.password) {
                let result = {
                    id: users.id,
                    firstname: users.first_name,
                    lastname: users.last_name,
                    email: users.email
                }
                let token = jwt.sign(result, "secretkey", { expiresIn: 86400 });
                //------------------- Display user details ---------------------
                let userdetails = {
                    id: users.id,
                    first_name: users.first_name,
                    last_name: users.last_name,
                    email: users.email,
                    role_name: users.role.role_name,
                    token: token
                }
                res.status(200).json({ userdetails, sucess: true });
            }
            else {
                let userdetails = { message: "authentication false", }
                res.status(401).json({ userdetails, sucess: false });
            }
        } else {
            let userdetails = { message: "User doesnot exists", }
            res.status(400).json({ userdetails, sucess: false });
        }
    } catch (e) {
        return e;
    }
}

// ----------------------------Image Upload-------------------------------------------------------------
const imgUpload = async (req, res) => {
    try {
        const { filename } = req.file;
        const filepath = `uploads/${filename}`;
        if (req.file) {
            res.status(200).json({ message: 'File uploaded successfully.', filepath });
        } else {
            res.status(400).json({ error: "failed to upload image" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error uploading file.' });
    }
}

// ------------------------------------------Email Link Navigation to Login --------------------------------------------------

const emailLink = async (req, res) => {
    try {
        const email = await user.findOne({ where: { id: req.params.id } });
        if (!email)
            return res.status(400).json(message, "Invalid Link");
        const token = email.token
        console.log(token, "tokennsssss");
        if (!token)
            return res.status(400).json(message, "Invalid Link");
        const result = await user.update({ verify: 'true' }, { where: { id: req.params.id } });
        res.redirect(200, "http://localhost:3000");
    } catch (error) {
        res.status(500).json({ error: "Internal server Error" })
    }

}

// ------------------------------------- Google Login ---------------------------------------------------------------------
const googleLogin = async (req, res) => {
    try {
        // ------ id_token is decoded to fetch googleId and email ----------------------------------
        const { googleId } = req.body;
        const client = new OAuth2Client("864826191326-oe772clsl3e4929sem84gr0a3jq68nvq.apps.googleusercontent.com");

        const googleVerifyInfo = await client.verifyIdToken({
            idToken: req.body.tokenObj.id_token,
            audience: "864826191326-oe772clsl3e4929sem84gr0a3jq68nvq.apps.googleusercontent.com"
        });

        let decodedGoogleInfo = googleVerifyInfo.getPayload()
        // ---------------googleId and sub are same --------------------------------------------------
        if (googleId == decodedGoogleInfo.sub) {
            const existingUser = await user.findOne({
                where: { email: decodedGoogleInfo.email }
            });

            let googleUser;

            if (existingUser) {
                googleUser = {
                    id: existingUser.id,
                    first_name: existingUser.first_name,
                    last_name: existingUser.last_name,
                    email: existingUser.email,
                    social_id: existingUser.social_id
                };
            } else {
                googleUser = {
                    first_name: decodedGoogleInfo.given_name,
                    last_name: decodedGoogleInfo.family_name,
                    email: decodedGoogleInfo.email,
                    social_id:decodedGoogleInfo.sub
                }
                let createdGoogleUser = await user.create(googleUser)
                console.log(createdGoogleUser,"hellow user")

            }
            const token = jwt.sign(googleUser, "secretkey", { expiresIn: 86400 });

            if (googleUser) {
                return res.status(200).json({ success: true, googleUser, token: token });
            } else {
                return res.status(401).json("Google login failed");
            }
        }
        else {
            return res.status(400).json("Unauthorized access")
        }

    } catch (error) {
        res.status(500).json({ error: "Internal server Error" });
    }
};

// -------------------------------------------- Facebook Social Login -------------------------------------------------
const facebookLogin = async (req, res) => {
    try {
        let { userId, accessToken } = req.body;
        let { data } = await axios.get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`)
        if (data.id != userId) {
            return res.status(400).json({ message: "Unauthorised access" });
        }
        const existingUser = await user.findOne({
            where: { email: data.email }
        });

        let fbUser;

        if (existingUser) {
            fbUser = {
                id: existingUser.id,
                first_name: existingUser.first_name,
                last_name: existingUser.last_name,
                email: existingUser.email,
                social_id: existingUser.social_id
            };
        } else {
            let str = data.name.split(" ")
            fbUser = {
                first_name: str[0],
                last_name: str[1],
                email: data.email,
                social_id:data.id
            }
            let createdFbUser = await user.create(fbUser)
        }

        const token = jwt.sign(fbUser, "secretkey", { expiresIn: 86400 });

        if (fbUser) {
            return res.status(200).json({ success: true, fbUser, token: token });
        } else {
            return res.status(401).json("Facebook login failed");
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server Error" });
    }
};

// --------------------------------------------------------------------------------------------------------------------

// --------------------------------------------- Instagram Login ------------------------------------------------------

const instaLogin = async (req, res) => {

    const instaInfo = await axios({
        method: "post",
        url: "https://api.instagram.com/oauth/access_token",
        data: qs.stringify({
            client_id: "334705815815196",
            client_secret: "61e4fc32c9b8307dbffd4ca814cdda0a",
            grant_type: 'authorization_code',
            redirect_uri:"https://localhost:3000/",
            code: req.body.code
        }),
        headers: { "Content-Type": 'application/x-www-form-urlencoded' },
    })
    instaToken = instaInfo['data']['access_token']
    userid = instaInfo['data']['user_id']

    const profile = await axios.get(`https://graph.instagram.com/${userid}?fields=id,username,account_type&access_token=${instaToken}`)
    const instaId = profile['data']['id']

    const existingUser = await user.findOne({
        where: { first_name: profile.data.username }
    });

    let instaUser;
    if (existingUser) {
        instaUser = {
            id: existingUser.id,
            first_name: existingUser.username,
            social_id: existingUser.social_id
        }
    } else {
        instaUser = {
            first_name: profile.data.username,
            social_id:profile.data.id
        }
        console.log(instaUser,"insta user")
        let createdInstagramUser = await user.create(instaUser)

    }
    const token = jwt.sign(instaUser, "secretkey", { expiresIn: 86400 });
    console.log(token,"tokenssssssssssss")
    if (instaUser) {
        return res.status(200).json({ success: true, instaUser, token: token });
    } else {
        return res.status(401).json("Instagram login failed");
    }
}

module.exports = {
    addUser,
    getUsers,
    getUserById,
    putUserById,
    deleteUserById,
    login,
    imgUpload,
    emailLink,
    googleLogin,
    facebookLogin,
    instaLogin

};