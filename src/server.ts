import { CONFIG_SERVICE, type ConfigService } from './services/config.service';

import type { AbstractBaseController } from './controllers/_base.controller';
import { DIContainer } from './container';
import { controllers } from './controllers/index.js';
import { providers } from './services';
import Elysia from 'elysia';
import type { Server } from 'bun';
import { LOGGER_SERVICE, type LoggerService } from './services/logger.service';
import { swagger } from '@elysiajs/swagger';

export class HttpApplication {
	private readonly di: DIContainer;
	private readonly app = new Elysia();

	constructor() {
		this.di = new DIContainer({
			providers,
			controllers,
		});

		this.mapRoutes();
	}

	public mapRoutes() {
		this.app.use(swagger());

		this.app.get('/', () => 'Hello Elysia');

		this.di.controllers.forEach((item) => {
			const controller = this.di.get<AbstractBaseController>(item.provide);
			controller.mapRoute();
			this.app.use(controller.route);
		});
	}

	public listen(): void {
		const configService = this.di.get<ConfigService>(CONFIG_SERVICE);
		this.app.listen(configService.get('API_PORT'), (server: Server) => {
			const loggerService = this.di.get<LoggerService>(LOGGER_SERVICE);
			loggerService.info(
				`🦊 Elysia is running at ${server?.hostname}:${server?.port}`
			);
		});
	}
}
