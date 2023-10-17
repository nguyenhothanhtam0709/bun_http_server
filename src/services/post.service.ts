import { AbstractBaseService } from './_base.service';
import { inject, injectable } from 'inversify';
import {
	POST_REPOSITORY,
	type PostRepository,
} from './repositories/post.repository';

type CreatePostData = {
	title: string;
	content: string | null;
};

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
		const newPost = await this.postRepository.insert(data);
		return newPost;
	}
}
