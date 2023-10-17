import { AbstractBaseService } from './_base.service';
import { injectable } from 'inversify';
import pino from 'pino';

export const LOGGER_SERVICE = Symbol('LoggerService');

@injectable()
export class LoggerService extends AbstractBaseService {
	private readonly logger = pino();

	public get defaultLogger() {
		return this.logger;
	}

	public info = this.logger.info.bind(this.logger);
}
