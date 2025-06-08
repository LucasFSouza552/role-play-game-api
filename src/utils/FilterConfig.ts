import { Filter } from "../models/Filters";
import { ThrowsError } from "../errors/ThrowsError";
import { FilterDefault } from "../models/Filters";

export default function filterConfig(filter: any): Filter {

	const { page, limit, orderBy, order, ...rest } = filter;

	const limitNumber = parseInt(limit);
	const pageNumber = parseInt(page);

	if(limitNumber < 0 || limitNumber > 100) {
		throw new ThrowsError("Limit must be between 0 and 100", 400);
	}

	if(pageNumber < 1) {
		throw new ThrowsError("Page must be greater than 0", 400);
	}

	return {
		...rest,
		limit: limitNumber || FilterDefault.limit,
		page: pageNumber || FilterDefault.page,
		orderBy: orderBy || FilterDefault.orderBy,
		order: order || FilterDefault.order,
	}
}