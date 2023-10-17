import type { InsertObject, Kysely } from 'kysely';

import { AbstractBaseService } from '../_base.service';
import type { DB } from '../../db/db.generated';
import type { DatabaseService } from '../database.service';

export class AbstractBaseRepository extends AbstractBaseService {
	protected readonly db: Kysely<DB>;

	constructor(
		protected readonly databaseService: DatabaseService,
		public readonly tableName: keyof DB
	) {
		super();
		this.db = this.databaseService.db;
	}

	public insert(data: InsertObject<DB, this['tableName']>) {
		return this.db
			.insertInto<this['tableName']>(this.tableName)
			.values(data)
			.returningAll()
			.executeTakeFirst();
	}
}
