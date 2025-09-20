export default {
	// Global options:
	verbose: true,
	// Command options:
	build: {
		overwriteDest: true,
	},
	run: {
		firefox: 'stable',
	},
	ignoreFiles: ['package-lock.json', 'yarn.lock'],
};
