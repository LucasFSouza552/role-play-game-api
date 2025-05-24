export interface RepositoryInterface {
    getAll(filter?: any): Promise<any[]>;
    getById(id: number): Promise<any>;
    create(element: any): Promise<any>;
    update(element: any): Promise<any>;
    delete(id: number): Promise<void>;
}