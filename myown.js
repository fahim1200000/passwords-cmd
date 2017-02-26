// required modules go in here
var crypto = require('crypto-js');

var storage = require('node-persist');
var Spinner = require('cli-spinner').Spinner;

//var spin = require('simple-spinner');
storage.initSync();

 
//var spinner = new Spinner('processing.. %s');
//spinner.setSpinnerString('|/-\\');
//spinner.start();
console.log("");
console.log('starting password manager');
//spin.start(100000);

console.log("")



var argv = require('yargs')
	.command('create', 'Create a new account', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account name (eg: Twitter, Facebook)',
				type: 'string'
			},
			username: {
				demand: true,
				alias: 'u',
				description: 'Account username or email',
				type: 'string'
			},
			password: {
				demand: true,
				alias: 'p',
				description: 'Account password',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				description: 'Master password',
				type: 'string'
			}
		}).help('help');
	})
	.command('get', 'Get an existing account', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account name (eg: Twitter, Facebook)',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				description: 'Master password',
				type: 'string'
			}
		}).help('help');
	})
	.help('help')
	.argv;
var command = argv._[0];

/*



	Helper notes: use this in order to remember how to pass info
	var encryptedMessage = crypto.AES.encrypt(JSON.stringify(secretMessage),secretKey);

	// and to decrypt it

	var bytes = crypto.AES.decrypt(encryptedMessage, secretKey);
    var decryptedMessage = bytes.toString(crypto.enc.Utf8);






*/


//functions required go in here


// i need a function that will save accounts in encrypted mode


function getAccounts(masterPassword){

	// use getItemSync to fetch accounts
	var getEncryptedAccounts = storage.getItemSync('popo');
	var accounts = [];
	// decrypt
	// check what to do if the encrypted storage unit is not undefined
	if (typeof getEncryptedAccounts !== 'undefined'){
		var decryptAccount = crypto.AES.decrypt(getEncryptedAccounts, masterPassword);
		accounts = JSON.parse(decryptAccount.toString(crypto.enc.Utf8));

	}
	// return accounts array, even if there is nothing in there, the return will be an array
	return accounts;

}
// the save account function will encrypt the given account and store it with its particular password
function saveAccount(accounts, masterPassword){
	// encrypt accounts
	var encrypted = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
	// store them first in the accounts array
	// setItemSync to save the encrypted accounts
	storage.setItemSync('popo',encrypted.toString());
	// return accounts

	return accounts;




}

function createAccount(account, masterPassword){
	// the account got passed as an object, pass it onto setItemSync
	// after aving it in a variable
	var accounts = storage.getItemSync('tests');
	//var accounts = [];
	// if there is nothing in accounts, make it an array
	if (typeof accounts === 'undefined'){
		accounts = [];
		
	}

	// push the account object parameter into the array
	accounts.push(account);
	console.log(accounts);
	// pass it to set item sync
	storage.setItemSync('tests',accounts);
	
}



// function for retrieving the account goes in here
function getAccount(accountName, masterPassword){
	// fetch the accounts
	var accounts = storage.getItemSync('tests');
	var gotIT;
	accounts.forEach(function(item){
		if (item.name === accountName){
			gotIt = item;
		}
		
	});
	return gotIt;
}




// main program flow goes in here

/*
if (command === 'create'){
	try {

		var createdAccount = createAccount({
			name: argv.name,
			username: argv.username,
			password:argv.password,
		    }, argv.masterPassword);

		console.log("Trying to create the account");

	} // end of try block

	catch(err){
		console.log("The account could not be created");
		console.log(storage.getItemSync('tests'));
	} // end of catch block
}// end of if statement

else if (command === "get") {
	try {
		console.log("Trying to access the account");
		var account = getAccount(argv.name, argv.masterPassword);
		console.log("Account found");
		console.log(account);

	}// end of try
	catch(err) {
		console.log("The acount could not be accessed at this time");
	}



}
*/

console.log("Testing the save accounts function");
var secretMessage = {
	name: argv.name,
	username: argv.username,
	password: argv.password
};
var secretKey = argv.masterPassword;



// note that isntead of variable reasignment we could have passed JSON.stringify(secertMessage) to the encrypt variable
//secretMessage = JSON.stringify(secretMessage);
// the above is the rpefered way as to not change the initial state of the object

// this is the actual encryption algorithm
var encryptedMessage = crypto.AES.encrypt(JSON.stringify(secretMessage),secretKey.toString());
console.log(saveAccount(secretMessage,secretKey));
console.log(encryptedMessage.toString()); 