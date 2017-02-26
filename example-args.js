var argv = require('yargs')
  .command('hello','Greets the user',function(yargs){
  	yargs.options({
  		name: {
  			demand: true,
  			alias: 'n',
  			description: "Your first name goes here"
  		},
  		lastname: {
  			demand: true,
  			alias: 'l',
  			description: 'Your last name goes here'
  		}
  	}).help('help');
  })
  .help('help')
  .argv;

if (argv._[0] === 'hello'){
	console.log('Hello World');
}
else {
	console.log(argv);
}

if (argv.name == "Enrique"){
	console.log("Welcome! " + argv.name);
}

