import { POST_CONTROLLER, PostController } from './post.controller';

import type { ControllerProvider } from '../container/types';

export const controllers: Array<ControllerProvider> = [
	{
		provide: POST_CONTROLLER,
		useClass: PostController,
	},
];
