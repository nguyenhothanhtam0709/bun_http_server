import { Elysia } from 'elysia';
import { injectable } from 'inversify';

type AbstractBaseControllerParams = {
	path: string;
};

@injectable()
export abstract class AbstractBaseController {
	public readonly path: string;
	public readonly route: Elysia<string>;

	constructor({ path }: AbstractBaseControllerParams) {
		this.path = path;
		this.route = new Elysia({
			prefix: path,
		});
	}

	abstract mapRoute(): void;
}
