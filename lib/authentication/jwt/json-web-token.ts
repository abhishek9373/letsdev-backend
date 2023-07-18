import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
const {readFileSync} = require("fs");
const privateKEY = readFileSync(__dirname + "/" + "keys/priv_key.pem", "utf8");
class JsonWebToken {
    /**
     * Sign JWT token
     * @param {*} token Instance of Token class
     */
    sign(token:any) {
        return new Promise<string>((resolve, reject) => {
            const signOptions = {
                issuer: "letsdev",
                expiresIn: token.exp,
                algorithm: "RS256"
            };
            
            jwt.sign(token.payload, privateKEY, signOptions, function (err:Error, res: string) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        })
    }

    /**
     * Sign JWT token
     * @param {*} password Instance of Token class
     */
    async encryptPassword(password:string):Promise<string> {
        try{
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            return hash;   
        }catch(err){
            throw(err);
        }
    }

        /**
     * Sign JWT token
     * @param {*} password Instance of Token class
     */
    async decryptPassword(password:string, hash: string): Promise<boolean> {
       try{
            const isOk = await bcrypt.compare(password, hash);
            return isOk;
        }
        catch(err){
            throw(err);
        }
    }

}

export default JsonWebToken;