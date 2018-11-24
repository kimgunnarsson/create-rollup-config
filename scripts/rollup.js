const chalk = require('chalk');

const checkRequirements = require('./requirements');
const installPackages = require('./packages');
const createTemplate = require('./template');
const addBuildScript = require('./buildScript');

module.exports = addRollup = opts => {
	console.log(`Adding Rollup ${chalk.cyan('→')} ${chalk.green(opts.workingPath)}.\n`);
	if(opts.configOnly) {
		console.log('Skipping install of packages.');
		console.log(`Remember to manually install these packages:\n\t${opts.dependencies.map(pkg => chalk.cyan(pkg)).join(',')}`); 
		
		checkRequirements(opts)
			.then(() => createTemplate(opts))
			.then(() => addBuildScript(opts))
			.then(() => console.log())
			.catch(err => {
				console.error(err);
				process.exit(1);				
			});
	} else {
		checkRequirements(opts)
			.then(() => installPackages(opts))
			.then(() => createTemplate(opts))
			.then(() => addBuildScript(opts))
			.then(() => console.log())
			.catch(err => {
				console.error(err);
				process.exit(1);				
			});
	}	
}