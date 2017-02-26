----- How it works

The command is passed giving the required flags:

node app.js create -n Facebook -u Bebi -p 123 -m masterP

At this point the arguments stand as

-> var command = argv._[0]; -> this captures the create flag <> it could also be get depending on what we passed

-----
argv.name		==  Facebook
argv.username           ==  Bebi
argv.password           ==  123
argv.masterPassword     ==  masterP
-----

The first statement that executes the flow of the program is an if statement in the event of passing the 
create command:

if (command  === 'create')

then we pass the argument items mentioned above into the  create account function:

if (command === 'create') {
  try {
    var createdAccount = createAccount({
      name: argv.name,
      username: argv.username,
      password: argv.password,
      }, argv.masterPassword);
  } catch(err) { console.log("Unable to create account") }

else if(command === 'get') {
  try {
    var fetchedAccount = getAccount(argv.name, argv.masterPassword);
    
    if (typeof fetchedAccount === 'undefined') {
      console.log("Account not found");
    } 
    else {
      console.log("Acccount found!");
      console.log(fetchedAccount);
    }
   catch(err) {
     consol.elog('Unable to fetch account');
   }
} // end of if statement


<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><
---------Creating the account
var createdAccount = createAccount({
      name: argv.name,
      username: argv.username,
      password: argv.password,
      }, argv.masterPassword);

The createAccount() function takes two arguments, the object being converted into an account, and the password to encrypt the account with.

function createAccount (account, masterPassword) {
	var accounts = getAccounts(masterPassword);

	accounts.push(account);

	saveAccounts(accounts, masterPassword);

	return account;
}


1.----First part, understanding getAccount()
In turn the createAccount uses two functions, one to get the accounts, and another one to save it.

getAccounts uses the master password to process its contennts.

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

To understand createAccount() we need to understand getAccounts first. In getAccounts() the master password is passed, in this case it is "masterP".

The process inside the above goes like this

var encryptedAccount = storage.getItemSync('accounts');
|
|  This variable gets the information inside the 'accounts' persist folders inside the accounts file
|  it saves the encrypted information inside the encryptedAccount variable
|  at this time, the items inside encryptedAccount are still encrypted
|_______

var accounts = [];
|
|  This is a variable array that is created in order to hold the information once it is decrypted
|  an if statement will determine what needs to be passed into it
|_______


if (typeof encryptedAccount !== 'undefined') {
|
|	This if statement checks if the accounts[] array has something inside, if it doesn't it populatesit
|
|	var bytes = crypto.AES.decrypt(encryptedAccount, masterPassword);
|          |
|          | this variable is created if the encryptedAccount[] array had smthing inside(if it was undef)
|          | it gets the result from the AES.decrypt method with the masterPassword being passed
|          | as its argument.
|	   |______________________
|
|       accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
|		|
|		| if encryptedAccount has something inside JSON.parse(bytes.toString(crypto.enc.Utf8));
|		| will get the string content that was encrypted and will parse it back into an object
|       	|_________
|
|
|_________


At the end we pass in the accounts variable, depending on what happens inside the if statement is how the
account will be passed.

2------ understanding saveAccounts();

So getAccounts() returns the decrypted string, that is basically all it does, it brings back a
list array with objects inside of it.

the next part inside createAccounts is to push the account added into the accounts array that was returned
from getAccounts()

var accounts = getAccounts(masterPassword);
accounts.push(account);

This next part is interesting, it is the saveAccounts() which does the complete opposite of getAccounts() by encrypting the passed information

function saveAccounts (accounts, masterPassword) {
	// encrypt accounts
	var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
	
	// setItemSync
	storage.setItemSync('accounts', encryptedAccounts.toString());
	
	// return accounts
	return accounts;
}


It is quite simple really, saveAccounts takes in an array list, and the password as arguments
after that it passes them on to the encryption variable, it gets stringed and passed to the storage, that is it actually.




<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><


