const chalk = require('chalk');
const spawn = require('cross-spawn');

module.exports = installPackages = opts => 
	new Promise((resolve, reject) => {
		if(!opts.dependencies || opts.dependencies.length === 0) {
			reject(new Error('Argument dependencies cannot be null'));
			return;
		}
	
		console.log('Installing packages. This can take a couple of minutes.');
	 	console.log(`Installing ${opts.dependencies.map(pkg => chalk.cyan(pkg)).join(', ')}`); 

		const command = 'npm';
		const args = ['install', '--save-dev'].concat(opts.dependencies);
		const processArgs = { stdio: 'ignore' };
		const childProcess = spawn(command, args, processArgs);
		
		childProcess.on('close', exitCode => {
			if(exitCode === 0) {
				resolve();
				return;
			}

			reject(new Error(`Command failed. ${command} ${args.join(' ')}`));
		});
	});