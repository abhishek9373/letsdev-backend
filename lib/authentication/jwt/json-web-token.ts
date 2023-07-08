const jwt = require('jsonwebtoken');
const {readFileSync} = require("fs");
const privateKEY = readFileSync(__dirname + "/" + "priv_key.pem", "utf8");

class JsonWebToken {
    /**
     * Sign JWT token
     * @param {*} token Instance of Token class
     */
    sign(token:any) {
        return new Promise((resolve, reject) => {
            const signOptions = {
                issuer: "househub",
                expiresIn: token.exp,
                algorithm: "RS256"
            };
            
            jwt.sign(token.payload, privateKEY, signOptions, function (err:Error, res: Response) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        })
    }
}

export default JsonWebToken;