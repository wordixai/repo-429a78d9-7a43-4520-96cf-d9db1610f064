import { User } from '@/types/user';

export const mockUsers: User[] = [
  {
    id: '1',
    name: '张三',
    email: 'zhangsan@example.com',
    role: 'admin',
    status: 'active',
    department: '技术部',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    createdAt: '2024-01-15',
    lastLogin: '2024-03-15',
    phone: '+86 138-0013-8000'
  },
  {
    id: '2',
    name: '李四',
    email: 'lisi@example.com',
    role: 'user',
    status: 'active',
    department: '市场部',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    createdAt: '2024-02-01',
    lastLogin: '2024-03-14',
    phone: '+86 139-0013-9000'
  },
  {
    id: '3',
    name: '王五',
    email: 'wangwu@example.com',
    role: 'moderator',
    status: 'pending',
    department: '人事部',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    createdAt: '2024-02-15',
    phone: '+86 137-0013-7000'
  },
  {
    id: '4',
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: 'user',
    status: 'inactive',
    department: '财务部',
    createdAt: '2024-01-30',
    lastLogin: '2024-02-28',
    phone: '+86 136-0013-6000'
  },
  {
    id: '5',
    name: '陈七',
    email: 'chenqi@example.com',
    role: 'user',
    status: 'active',
    department: '技术部',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    createdAt: '2024-03-01',
    lastLogin: '2024-03-15',
    phone: '+86 135-0013-5000'
  }
];