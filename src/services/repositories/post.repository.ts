import { DATABASE_SERVICE, type DatabaseService } from '../database.service';
import { AbstractBaseRepository } from './_base.repository';
import { inject, injectable } from 'inversify';

export const POST_REPOSITORY = Symbol('PostRepository');

@injectable()
export class PostRepository extends AbstractBaseRepository {
	constructor(
		@inject(DATABASE_SERVICE)
		protected readonly databaseService: DatabaseService
	) {
		super(databaseService, 'posts');
	}
}
