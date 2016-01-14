var _ = require('underscore');

module.exports = {
	openParens: '(',
	closeParens: ')',
	plus: '+',
	minus: '-',
	times: '*',
	divide: '/',
	quote: '"',
	isALetter: _.partial(_.contains,'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
	isANumber: _.partial(_.contains,'0123456789'),
	isAToken: _.partial(_.contains,'()*+-/'),
	functionMap: {
		'+': 'add',
		'-': 'subtract',
		'*': 'multiply',
		'/': 'divide',
		'print': 'print'
	},
	coreFunctions: ['print', 'defn']
}
