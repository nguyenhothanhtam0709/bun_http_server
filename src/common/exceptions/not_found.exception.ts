import { HttpCode, HttpStatus } from '../enums/http_exception';

import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
	constructor(message?: string) {
		super(HttpCode.NOT_FOUND, HttpStatus.NOT_FOUND, message);
	}
}
