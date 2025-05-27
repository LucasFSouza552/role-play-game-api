import { NextFunction, Request, Response } from "express";

const camposPermitidos = ['name', 'password'];

export function validateAllowedFields(req: Request, res: Response, next: NextFunction) {
	const campos = Object.keys(req.body);

	const invalidFields = campos.filter(campo => !camposPermitidos.includes(campo));

	if (invalidFields.length > 0) {
		const plural = invalidFields.length > 1 ? 's' : '';
		const message = `O${plural} campo${plural} ${invalidFields.join(', ')} não ${plural ? 'são' : 'é'} permitido${plural}.`;
		res.status(400).json({
			error: message,
			allowedFields: camposPermitidos,
			invalidFields
		});
		return;
	}

	next();
}
