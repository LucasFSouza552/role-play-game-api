import { Filter } from "../models/Filters";


export interface ServiceInterface<CreateType, UpdateType, EntityType> {
    getAll(filter?: Filter): Promise<EntityType[]>;
    getById(id: number): Promise<EntityType>;
    create(element: CreateType): Promise<EntityType>;
    update(element: UpdateType): Promise<UpdateType>;
    delete(id: number): Promise<void>;
}
