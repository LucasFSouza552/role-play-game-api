import { validate } from "uuid";

export default function ValidateChampionId(id: string) {
	return id && validate(id);
}