export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'pending';
  department: string;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  phone?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'pending';
  department: string;
  phone?: string;
}

export interface UpdateUserData extends Partial<CreateUserData> {
  id: string;
}