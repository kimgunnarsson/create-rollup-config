const chalk = require('chalk');
const fs = require('fs-extra');
const spawn = require('cross-spawn');
const path = require('path');

module.exports = checkRequirements = opts =>
	new Promise((resolve, reject) => {
		const packagePath = path.join(opts.workingPath, 'package.json');

		if (fs.pathExistsSync(packagePath)) {
			resolve();
			return;
		}

		console.log(`Creating ${chalk.cyan('package.json')}.\n`);

		const command = 'npm';
		const args = ['init', '-f'];
		const processArgs = { stdio:  'ignore' };
		const childProcess = spawn(command, args, processArgs);

		childProcess.on('close', exitCode => {
			if (exitCode === 0) {
				resolve();
				return;
			}

			reject(new Error(`Command failed. ${command} ${args.join(' ')}`));
		});
	});

