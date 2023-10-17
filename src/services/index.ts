import { CONFIG_SERVICE, ConfigService } from './config.service';
import { DATABASE_SERVICE, DatabaseService } from './database.service';
import { LOGGER_SERVICE, LoggerService } from './logger.service';
import {
	POST_REPOSITORY,
	PostRepository,
} from './repositories/post.repository';
import { POST_SERVICE, PostService } from './post.service';

import type { Provider } from '../container/types';

export const providers: Array<Provider> = [
	{
		provide: CONFIG_SERVICE,
		useClass: ConfigService,
	},
	{
		provide: DATABASE_SERVICE,
		useClass: DatabaseService,
	},
	{
		provide: LOGGER_SERVICE,
		useClass: LoggerService,
	},
	{
		provide: POST_SERVICE,
		useClass: PostService,
	},
	{
		provide: POST_REPOSITORY,
		useClass: PostRepository,
	},
];
