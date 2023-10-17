import { AbstractBaseService } from './_base.service';
import { inject, injectable } from 'inversify';
import { CONFIG_SERVICE, type ConfigService } from './config.service';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import type { DB } from '../db/db.generated';

export const DATABASE_SERVICE = Symbol('DatabaseService');

@injectable()
export class DatabaseService extends AbstractBaseService {
	private readonly _db: Kysely<DB>;

	constructor(
		@inject(CONFIG_SERVICE)
		private readonly configService: ConfigService
	) {
		super();

		const dialect = new PostgresDialect({
			pool: new Pool({
				connectionString: this.configService.get('DATABASE_URL'),
				max: 10,
			}),
		});
		this._db = new Kysely<DB>({
			dialect,
		});
	}

	public get db() {
		return this._db;
	}
}
