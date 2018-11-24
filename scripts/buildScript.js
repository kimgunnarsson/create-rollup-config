const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

module.exports = addBuildScript = opts => 	
	new Promise((resolve, reject) => {
		console.log(`Adding npm scripts to ${chalk.cyan('package.json')}`);

		const packagePath = path.join(opts.workingPath, 'package.json');
		const packageJson = require(packagePath);

		if(!packageJson) {
			console.error(chalk.red('\tCouldn\'t read package.json'));
			reject();
			return;
		}

		if(packageJson.scripts['build']) {
			const buildScriptContent = packageJson.scripts['build'];

			if(buildScriptContent.indexOf('rollup -c') > -1) {
				console.log(chalk.green(`Script 'build' does already exist and contains 'rollup -c'.`));
				console.log(`\nInvoke Rollup by running ${chalk.green('npm run build')} or ${chalk.green('yarn build')}`);
			} else {
				if(!packageJson.scripts['rollup']) {
					packageJson.scripts['rollup'] = 'rollup -c';
				}

				console.log(chalk.yellow(`\nWarning: Script 'build' does already exist, but does not contain 'rollup -c'`));
				console.log(`\nInvoke Rollup by running ${chalk.green('npm run rollup')} or ${chalk.green('yarn rollup')}`);
			}
		} else {
			packageJson.scripts['build'] = 'rollup -c';
			console.log(`\nInvoke Rollup by running ${chalk.green('npm run build')} or ${chalk.green('yarn build')}`);
		}
		
		fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + os.EOL);
		resolve();		
	});