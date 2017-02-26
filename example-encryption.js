var crypto = require('crypto-js');


// After importing the necessary library package which was downloaded by NPM
// two variables must be created that will represent the encryption, one is the message
// the other is the key
var secretMessage = {
	name: "Alex",
	secretName: "Adler"
};
var secretKey = '123abc';



// note that isntead of variable reasignment we could have passed JSON.stringify(secertMessage) to the encrypt variable
//secretMessage = JSON.stringify(secretMessage);
// the above is the rpefered way as to not change the initial state of the object

// this is the actual encryption algorithm
var encryptedMessage = crypto.AES.encrypt(JSON.stringify(secretMessage),secretKey);

console.log(encryptedMessage);
console.log("=======================================================================");
console.log('Encrypted Message: ' + encryptedMessage);
console.log("=======================================================================");
console.log("");


// decrypting the message
//-----------------Another way to do this is to have a variable that saves the decrypted algorithm
//var bytes = crypto.AES.decrypt(encryptedMessage, secretKey);
//var decryptedMessage = bytes.toString(crypto.enc.Utf8);
//----------------Pass it to the decrypt message variable by applying toString(crypto.enc.Utf8) to it
var decryptedMessage = crypto.AES.decrypt(encryptedMessage,secretKey).toString(crypto.enc.Utf8);
// parse the object back into an object from the decryptedMessage variable
// since the message was transformed from an object to string, the value in decryptedMessage is now a string
// in order to pass it back into an object we need to
// do a variable reasignment
console.log("");
decryptedMessage = JSON.parse(decryptedMessage);
console.log("========================================================================");
console.log("Descrypted message: " + decryptedMessage);
console.log(decryptedMessage);
console.log("The value indeed was transformed into a message, we can select the properties now and see");
console.log("The items are: ");
for (item in decryptedMessage){
	console.log(item + " : " +decryptedMessage[item]);
}
console.log("========================================================================");
