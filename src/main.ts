import 'reflect-metadata';

import { HttpApplication } from './server';

function main() {
	const httpApp = new HttpApplication();
	httpApp.listen();
}

if (import.meta.main) {
	main();
}
