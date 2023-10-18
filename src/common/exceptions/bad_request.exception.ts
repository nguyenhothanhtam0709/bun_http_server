import { HttpCode, HttpStatus } from '../enums/http_exception';

import { HttpException } from './http.exception';

export class BadRequestException extends HttpException {
	constructor(message?: string) {
		super(HttpCode.BAD_REQUEST, HttpStatus.BAD_REQUEST, message);
	}
}
