console.log('starting password manager');

var crypto = require('crypto-js')
var storage = require('node-persist');
storage.initSync();

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

// create
//     --name
//     --username
//     --password

// get
//     --name

// account.name Facebook
// account.username User12!
// account.password Password123!

/*



	Note: This works with arrays as the predominant data structure to manipulate information throughout the whole process
		  thus remember, if we need to get information from the persist file, we need to set a variable and pass the information to it

		  var encryptedAccount = storage.getItemSync('accounts');

		  thus, the encryptedAccount variable will hold information in the form of an array.

		  



*/


// Takes te master password
// gets whatever is in the accounts persist file
// if the encryptedAccount which revieces the accounts is undefined, then we decrypt whatever is inside the accounts file
// and then we return the parse into an array



function getAccounts (masterPassword) {
	// use getItemSync to fetch accounts
	var encryptedAccount = storage.getItemSync('accounts');
	var accounts = [];

	// decrypt
	if (typeof encryptedAccount !== 'undefined') {
		var bytes = crypto.AES.decrypt(encryptedAccount, masterPassword);
		accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
	}

	// return accounts array
	return accounts;
}



// gets the accounts array object and a master password,
// encrypts them
// saves them into the encryptedAccounts variable and then pushes it into the account.

function saveAccounts (accounts, masterPassword) {
	// encrypt accounts
	var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword); //this is what trips me off
	
	// setItemSync
	storage.setItemSync('accounts', encryptedAccounts.toString());
	
	// return accounts
	return accounts;
}

function createAccount (account, masterPassword) {
	var accounts = getAccounts(masterPassword);
	// accounts is an []
	accounts.push(account);
	// save accounts encrypts the account and passes it to the master password
	saveAccounts(accounts, masterPassword);

	return account;
}

function getAccount (accountName, masterPassword) {
    var accounts = getAccounts(masterPassword);
    var matchedAccount = [];
    accounts.forEach(account => {
        if (account.name.toUpperCase() === accountName.toUpperCase()) {
            matchedAccount.push(account);
        }
    });
    return matchedAccount;
}





if (command === 'create') {
	try {
		var createdAccount = createAccount({
			name: argv.name,
			username: argv.username,
			password: argv.password
		}, argv.masterPassword);
		console.log('Account created!');
		console.log(createdAccount);
	} catch (e) {
		console.log('Unable to create account.');
	}
} else if (command === 'get') {
	try {
		var fetchedAccount = getAccount(argv.name, argv.masterPassword);

		if (typeof fetchedAccount === 'undefined') {
			console.log('Account not found');
		} else {
			console.log('Account found!');
			console.log(fetchedAccount);
		}
	} catch (e) {
		console.log('Unable to fetch account.');
	}
}



















