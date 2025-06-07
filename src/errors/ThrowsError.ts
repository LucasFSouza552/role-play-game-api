export class ThrowsError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.name = "ThrowsError";
		this.statusCode = statusCode;
	}
}
