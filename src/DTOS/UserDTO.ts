import { user } from "./../models/User";

// Criar um usuário sem o cargo (role) e sem o id
export type createUserDTO = Omit<user, 'id' | 'role'>;

// Atualizar o usuário sem o cargo (role)
export type updateUserDTO = Required<Pick<user, 'id'>> & Partial<Pick<user, 'name' | 'password'>>;

// Retonar o usuário sem a senha
export type userDTO = Omit<user, 'password'>;