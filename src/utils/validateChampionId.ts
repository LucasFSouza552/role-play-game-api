import { validate } from "uuid";

export default function ValidateUUID(id: string) {
	return id && validate(id);
}