const express = require("express");
let router = express.Router();
const {loginModel} = require("../model/loginModel")
const getLoggedUserData = require("../helper/getLoggedUserData")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyAuthToken = require("../helper/verifyAuthToken")
const findUserByEmail = async (email) => {
    try {
        return await loginModel.findOne({ email });
    } catch (error) {
        throw error;
    }
};

const comparePasswords = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw error;
    }
};

const generateAuthToken = (email) => {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);

        if (user && (await comparePasswords(password, user.password))) {
            const token = generateAuthToken(email);

            const responseData = {
                logged: 1,
                authToken: token,
                username: user.username,
                userid: user.uuid
            };

            res.json(responseData);
        } else {
            res.json({ logged: 0 });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

router.post("/", async (req, res) => {
    try {
        await loginUser(req, res);
    } catch (error) {
        console.log(error);
    }
});


// Middleware to extract token from authorization header
const extractToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
        req.token = authHeader.split(' ')[1];
    } else {
        req.token = null;
    }

    next();
};

// Function to check authentication
const isAuthenticated = async (token) => {
    try {
        if (!token) {
            return false;
        }

        const loggedUserData = await getLoggedUserData(token);

        return loggedUserData;
    } catch (error) {
        throw error;
    }
};

router.post("/isauthenticated", extractToken, async (req, res) => {
    try {
        const isAuthenticatedRes = await isAuthenticated(req.token);

        // console.log("is : " ,isAuthenticatedRes);

        if (isAuthenticatedRes) {
            const loggedUserData = await getLoggedUserData(req.token);
            res.json({
                isAuthenticated: 1,
                username: loggedUserData.username,
                userid: loggedUserData.userid
            });
        } else {
            res.json({ isAuthenticated: 0 });
        }
    } catch (error) {
        console.error("Error during authentication check:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
