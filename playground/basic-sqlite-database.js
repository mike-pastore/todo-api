var Sequelize = require ('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	// tell which database you want to use
	'dialect': 'sqlite',
	// storage path (specific to sqlite)
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING
	},
	completed: {
		type: Sequelize.BOOLEAN
	}
});

sequelize.sync({force: true}).then(function () {
	console.log('Everything is synced');

	Todo.create({
		description: 'Walk my dog',
		completed: false
	}).then(function (todo){
		console.log('Finished!');
		console.log(todo); 
	});
});