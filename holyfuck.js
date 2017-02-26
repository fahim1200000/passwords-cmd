console.log('starting password manager');

var crypto = require('crypto-js')
var storage = require('node-persist');
storage.initSync();

function saveAccount(accounts, masterPassword){
	// encrypt accounts
	var encrypted = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
	// store them first in the accounts array
	// setItemSync to save the encrypted accounts
	storage.setItemSync('caca',encrypted.toString());
	// return accounts

	return accounts;
}



console.log("Testing the save accounts function");
var secretMessage = {
	name: "bebi",
	username: "hates",
	password: "bs"
};
var secretKey = "bs";

saveAccount(secretMessage, secretKey);
