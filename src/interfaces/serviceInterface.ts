import { Filter } from "../models/Filters";


export interface ServiceInterface<CreateType, UpdateType, EntityType> {
    getAll(filter?: Filter): Promise<EntityType[]>;
    getById(id: number, userId?: number): Promise<EntityType>;
    create(element: CreateType): Promise<EntityType>;
    update(element: UpdateType): Promise<UpdateType>;
    delete(id: number, userId?: number): Promise<boolean>;
}
