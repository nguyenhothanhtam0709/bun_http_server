import type { HttpCode, HttpStatus } from '../enums/http_exception';

export class HttpException extends Error {
	public code: HttpCode;
	public status: HttpStatus;
	constructor(code: HttpCode, status: HttpStatus, message?: string) {
		super(message);

		this.code = code;
		this.status = status;
	}
}
