import { AbstractBaseService } from './_base.service';
import { injectable } from 'inversify';

type EnvConfig = {
	DATABASE_URL: string;
	API_PORT: number;
};

export const CONFIG_SERVICE = Symbol('ConfigService');

@injectable()
export class ConfigService extends AbstractBaseService {
	private readonly config: EnvConfig;

	constructor() {
		super();

		this.config = this.loadEnv();
	}

	private loadEnv(): EnvConfig {
		return Object.freeze({
			DATABASE_URL: Bun.env.DATABASE_URL ?? '',
			API_PORT: parseInt(Bun.env.API_PORT ?? '3000'),
		});
	}

	public get<K extends keyof EnvConfig>(key: K): EnvConfig[K] {
		return this.config[key];
	}
}
