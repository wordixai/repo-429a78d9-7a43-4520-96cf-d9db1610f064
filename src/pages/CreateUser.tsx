import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserStore } from '@/store/userStore';
import { CreateUserData } from '@/types/user';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreateUser() {
  const navigate = useNavigate();
  const { createUser } = useUserStore();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CreateUserData>();
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (data: CreateUserData) => {
    setLoading(true);
    try {
      await createUser(data);
      toast({
        title: '用户创建成功',
        description: `用户 ${data.name} 已成功创建。`,
      });
      navigate('/users');
    } catch (error) {
      toast({
        title: '创建失败',
        description: '创建用户时发生错误，请重试。',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => navigate('/users')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回用户列表
        </Button>
        <div>
          <h1 className="text-3xl font-bold">新增用户</h1>
          <p className="text-muted-foreground mt-1">创建新的系统用户</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleCreateUser)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">电话</Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    placeholder="请输入电话号码"
                  />
                </div>
                
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
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              
              <div className="flex space-x-4 pt-4">
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? '创建中...' : '创建用户'}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/users')}>
                  取消
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}