import { Achievement } from "./Achievements";
import { Champion } from "./Champion";

export interface Guild {
    id:number;
    name:string;
    level:number;
    champions:Champion[];
    achievements:Achievement[];
}