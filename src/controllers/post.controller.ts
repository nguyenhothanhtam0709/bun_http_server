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
		// post /posts
		this.route.post(
			'/',
			async ({ body }) => {
				const post = await this.postService.createPost(body as any);
				return post;
			},
			{
				body: t.Object({
					title: t.String({
						maxLength: 256,
					}),
					content: t.Optional(t.String()),
				}),
			}
		);

		// get /posts
		this.route.get('/', () => {
			return this.postService.getPosts();
		});

		// get /posts/:id
		this.route.get(
			'/:id',
			({ params: { id } }) => {
				return this.postService.getPost(id);
			},
			{
				params: t.Object({
					id: t.Numeric(),
				}),
			}
		);

		// put /posts/:id
		this.route.put(
			'/:id',
			({ params: { id }, body }) => {
				return this.postService.update(id, body as any);
			},
			{
				params: t.Object({
					id: t.Numeric(),
				}),
				body: t.Object({
					title: t.Optional(
						t.String({
							maxLength: 256,
						})
					),
					content: t.Optional(t.String()),
				}),
			}
		);

		// delete /posts/:id
		this.route.delete(
			'/:id',
			({ params: { id } }) => {
				return this.postService.delete(id);
			},
			{
				params: t.Object({
					id: t.Numeric(),
				}),
			}
		);
	}
}
