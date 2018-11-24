'use strict';

const commander = require('commander');
const path = require('path');
const packageJson = require('./package.json');
const addRollup = require('./scripts/rollup');

const dependencies = ['rollup', 'rollup-plugin-node-resolve'];

const program = new commander.Command(packageJson.name)
	.version(packageJson.version)
	.usage(`[options]`)
	.option('-C, --config-only', 'create config only')
	.parse(process.argv);

addRollup({
	configOnly: program.configOnly,
	workingPath: process.cwd(),
	templatePath: path.join(__dirname, 'template'),
	dependencies: dependencies
});