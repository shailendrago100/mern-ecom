const Jwt = require("jsonwebtoken");
const Boom =require("boom");

const createToken = async (payloadData, time) => {
  
    return new Promise((resolve, reject) => {
      Jwt.sign(payloadData,"secretKey", (err, jwt) => {
        if (err) {
          reject(err);
        } else {
          resolve(jwt);
        }
      });
    });
  };

const createAccessToken = async (tokenData, expireTime = 1440) => {
    try {
        console.log("access token creation")
        const accessToken = await createToken(tokenData, expireTime);

        if (accessToken) {
            return accessToken;
        } else {
            throw Boom.badRequest("token not create");
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {createAccessToken};