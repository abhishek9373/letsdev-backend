import crypto from 'crypto';
import fs from 'fs';

function genKeyPair() {
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1" 
      format: 'pem' // Most common formatting choice
    },
    privateKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem' // Most common formatting choice
    }
  });

  // Create the public key file
  fs.writeFileSync(__dirname + '/keys/pub_key.pem', keyPair.publicKey.toString());

  // Create the private key file
  fs.writeFileSync(__dirname + '/keys/priv_key.pem', keyPair.privateKey.toString());
}

// Generates the keypair
export default genKeyPair;
