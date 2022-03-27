export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  // role: string;
  role: 'customer' | 'admin';
}

export interface CreateUserDTO extends Omit<User, 'id'> {}
