import { useState, useEffect } from 'react';
import { User, CreateUserData } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserData) => void;
  user?: User | null;
  loading?: boolean;
}

export function UserForm({ open, onClose, onSubmit, user, loading = false }: UserFormProps) {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreateUserData>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setIsEditing(true);
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('role', user.role);
      setValue('status', user.status);
      setValue('department', user.department);
      setValue('phone', user.phone || '');
    } else {
      setIsEditing(false);
      reset();
    }
  }, [user, setValue, reset]);

  const handleFormSubmit = (data: CreateUserData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? '编辑用户' : '新增用户'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">姓名 *</Label>
              <Input
                id="name"
                {...register('name', { required: '姓名不能为空' })}
                placeholder="请输入姓名"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">邮箱 *</Label>
              <Input
                id="email"
                type="email"
                {...register('email', { 
                  required: '邮箱不能为空',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: '邮箱格式不正确'
                  }
                })}
                placeholder="请输入邮箱"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">角色 *</Label>
              <Select
                value={watch('role')}
                onValueChange={(value: 'admin' | 'user' | 'moderator') => setValue('role', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择角色" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">用户</SelectItem>
                  <SelectItem value="moderator">版主</SelectItem>
                  <SelectItem value="admin">管理员</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">状态 *</Label>
              <Select
                value={watch('status')}
                onValueChange={(value: 'active' | 'inactive' | 'pending') => setValue('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">活跃</SelectItem>
                  <SelectItem value="inactive">停用</SelectItem>
                  <SelectItem value="pending">待审核</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">部门 *</Label>
              <Select
                value={watch('department')}
                onValueChange={(value) => setValue('department', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择部门" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="技术部">技术部</SelectItem>
                  <SelectItem value="市场部">市场部</SelectItem>
                  <SelectItem value="人事部">人事部</SelectItem>
                  <SelectItem value="财务部">财务部</SelectItem>
                  <SelectItem value="运营部">运营部</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">电话</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="请输入电话号码"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              取消
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '保存中...' : (isEditing ? '更新' : '创建')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}