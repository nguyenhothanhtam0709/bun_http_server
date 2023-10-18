import { AbstractBaseService } from './_base.service';
import { inject, injectable } from 'inversify';
import {
	POST_REPOSITORY,
	type PostRepository,
} from './repositories/post.repository';
import { BadRequestException } from '../common/exceptions/bad_request.exception';
import { DB } from '../db/db.generated';
import { NotFoundException } from '../common/exceptions/not_found.exception';

type CreatePostData = {
	title: string;
	content: string | null;
};

type UpdatePostData = CreatePostData;

export const POST_SERVICE = Symbol('PostService');

@injectable()
export class PostService extends AbstractBaseService {
	constructor(
		@inject(POST_REPOSITORY)
		private readonly postRepository: PostRepository
	) {
		super();
	}

	public async createPost(data: CreatePostData) {
		const isExist = await this.postRepository
			.createSelectQuery()
			.selectAll()
			.where('title' as keyof DB['posts'], '=', data.title)
			.executeTakeFirst();
		if (isExist) {
			throw new BadRequestException();
		}

		const newPost = await this.postRepository.insert(data);
		return newPost;
	}

	public getPosts() {
		return this.postRepository.createSelectQuery().selectAll().execute();
	}

	public async getPost(id: number) {
		const post = await this.postRepository
			.createSelectQuery()
			.selectAll()
			.where('id', '=', id)
			.executeTakeFirst();
		if (!post) {
			throw new NotFoundException();
		}

		return post;
	}

	public async update(id: number, body: UpdatePostData) {
		const post = await this.postRepository
			.createUpdateQuery()
			.set(body)
			.where('id', '=', id)
			.executeTakeFirst();
		if (!post.numUpdatedRows) {
			throw new NotFoundException();
		}
	}

	public async delete(id: number) {
		const result = await this.postRepository
			.createDeleteQuery()
			.where('id', '=', id)
			.executeTakeFirst();
		if (!result.numDeletedRows) {
			throw new NotFoundException();
		}
	}
}
