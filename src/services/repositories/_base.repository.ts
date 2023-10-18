import type { InsertObject, Kysely } from 'kysely';

import { AbstractBaseService } from '../_base.service';
import type { DB } from '../../db/db.generated';
import type { DatabaseService } from '../database.service';

type TTableName = keyof DB;

export class AbstractBaseRepository extends AbstractBaseService {
	protected readonly db: Kysely<DB>;

	constructor(
		protected readonly databaseService: DatabaseService,
		public readonly tableName: TTableName
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

	public createSelectQuery() {
		return this.db.selectFrom(this.tableName);
	}

	public createUpdateQuery() {
		return this.db.updateTable(this.tableName);
	}

	public createDeleteQuery() {
		return this.db.deleteFrom(this.tableName);
	}
}
