const chalk = require('chalk');
const ncp = require('ncp').ncp;

module.exports = copyTemplate = opts => 
	new Promise((resolve, reject) => {
		console.log(`\nAdding ${chalk.cyan('rollup.config.js')}\n`);

		ncp(opts.templatePath, opts.workingPath, err => {
			reject(err);
			return;
		});
		resolve();
	});