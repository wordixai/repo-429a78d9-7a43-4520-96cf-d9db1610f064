import { create } from 'zustand';
import { User, CreateUserData, UpdateUserData } from '@/types/user';
import { mockUsers } from '@/lib/mockData';

interface UserStore {
  users: User[];
  loading: boolean;
  searchTerm: string;
  filterRole: string;
  filterStatus: string;
  
  // Actions
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchTerm: (term: string) => void;
  setFilterRole: (role: string) => void;
  setFilterStatus: (status: string) => void;
  
  // CRUD operations
  createUser: (userData: CreateUserData) => Promise<User>;
  updateUser: (userData: UpdateUserData) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
  getFilteredUsers: () => User[];
  
  // Initialize
  initializeUsers: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  loading: false,
  searchTerm: '',
  filterRole: 'all',
  filterStatus: 'all',
  
  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setFilterRole: (filterRole) => set({ filterRole }),
  setFilterStatus: (filterStatus) => set({ filterStatus }),
  
  createUser: async (userData) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=150`
    };
    
    set((state) => ({
      users: [...state.users, newUser]
    }));
    
    return newUser;
  },
  
  updateUser: async (userData) => {
    const updatedUser = { ...userData } as User;
    
    set((state) => ({
      users: state.users.map(user => 
        user.id === userData.id ? { ...user, ...updatedUser } : user
      )
    }));
    
    return updatedUser;
  },
  
  deleteUser: async (id) => {
    set((state) => ({
      users: state.users.filter(user => user.id !== id)
    }));
  },
  
  getFilteredUsers: () => {
    const { users, searchTerm, filterRole, filterStatus } = get();
    
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  },
  
  initializeUsers: () => {
    set({ users: mockUsers });
  }
}));