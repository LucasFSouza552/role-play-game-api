import { Member } from "./Members";

export interface Guild {
    id:number,
    name:string,
    level:number,
    members:Member[]
}