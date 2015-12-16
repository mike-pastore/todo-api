var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	// tell which database you want to use
	'dialect': 'sqlite',
	// storage path (specific to sqlite)
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

var User = sequelize.define('user', {
	email: Sequelize.STRING
});

Todo.belongsTo(User);
User.hasMany(Todo);

sequelize.sync({
	// force: true
}).then(function() {
	console.log('Everything is synced');

	User.findById(1).then(function (user) {
		user.getTodos({
			where: {
				description: {
					$like: '%make%'
				}
			}
		}).then(function (todos) {
			todos.forEach(function (todo) {
				console.log(todo.toJSON());
			});
		});
	});

	// User.create({
	// 	email: 'mike@example.com'
	// }).then(function() {
	// 	return Todo.create({
	// 		description: 'Make dinner with Kera'
	// 	});
	// }).then(function (todo) {
	// 	User.findById(1).then(function (user) {
	// 		user.addTodo(todo);
	// 	});
	// });
});