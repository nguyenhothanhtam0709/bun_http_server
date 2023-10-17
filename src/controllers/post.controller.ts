import { AbstractBaseController } from './_base.controller';
import { inject, injectable } from 'inversify';
import { t } from 'elysia';
import { POST_SERVICE, type PostService } from '../services/post.service';

export const POST_CONTROLLER = Symbol('PostController');

@injectable()
export class PostController extends AbstractBaseController {
	constructor(
		@inject(POST_SERVICE)
		private readonly postService: PostService
	) {
		super({
			path: '/posts',
		});
	}

	public mapRoute(): void {
		this.route.post(
			'/',
			async ({ body }) => {
				const post = await this.postService.createPost(body);
				return post;
			},
			{
				body: t.Object({
					title: t.String({
						maxLength: 256,
					}),
					content: t.String(),
				}),
			}
		);
	}
}
