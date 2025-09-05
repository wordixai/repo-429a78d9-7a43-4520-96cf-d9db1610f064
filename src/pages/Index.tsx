import { useState, useEffect } from 'react';
import { Plus, Users, UserCheck, UserX, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/store/userStore';
import { UserCard } from '@/components/UserManagement/UserCard';
import { UserTable } from '@/components/UserManagement/UserTable';
import { UserForm } from '@/components/UserManagement/UserForm';
import { UserFilters } from '@/components/UserManagement/UserFilters';
import { User, CreateUserData } from '@/types/user';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Index = () => {
  const {
    users,
    loading,
    searchTerm,
    filterRole,
    filterStatus,
    setSearchTerm,
    setFilterRole,
    setFilterStatus,
    createUser,
    updateUser,
    deleteUser,
    getFilteredUsers,
    initializeUsers
  } = useUserStore();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const filteredUsers = getFilteredUsers();

  useEffect(() => {
    initializeUsers();
  }, [initializeUsers]);

  const handleCreateUser = async (userData: CreateUserData) => {
    try {
      await createUser(userData);
      toast({
        title: '用户创建成功',
        description: `用户 ${userData.name} 已成功创建。`,
      });
    } catch (error) {
      toast({
        title: '创建失败',
        description: '创建用户时发生错误，请重试。',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateUser = async (userData: CreateUserData) => {
    if (!editingUser) return;
    
    try {
      await updateUser({ ...userData, id: editingUser.id });
      toast({
        title: '用户更新成功',
        description: `用户 ${userData.name} 信息已更新。`,
      });
      setEditingUser(null);
    } catch (error) {
      toast({
        title: '更新失败',
        description: '更新用户时发生错误，请重试。',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    try {
      await deleteUser(userToDelete.id);
      toast({
        title: '用户删除成功',
        description: `用户 ${userToDelete.name} 已被删除。`,
      });
      setUserToDelete(null);
    } catch (error) {
      toast({
        title: '删除失败',
        description: '删除用户时发生错误，请重试。',
        variant: 'destructive',
      });
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
  };

  const closeUserForm = () => {
    setShowUserForm(false);
    setEditingUser(null);
  };

  // 统计数据
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    pending: users.filter(u => u.status === 'pending').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="admin-header p-6 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">用户管理系统</h1>
              <p className="text-white/80 mt-1">
                管理和查看所有用户信息
              </p>
            </div>
            <Button
              onClick={() => setShowUserForm(true)}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Plus className="h-4 w-4 mr-2" />
              新增用户
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="admin-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总用户数</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">系统中的总用户数</p>
            </CardContent>
          </Card>
          
          <Card className="admin-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <p className="text-xs text-muted-foreground">当前活跃的用户</p>
            </CardContent>
          </Card>
          
          <Card className="admin-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">停用用户</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
              <p className="text-xs text-muted-foreground">已停用的用户</p>
            </CardContent>
          </Card>
          
          <Card className="admin-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">待审核</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">等待审核的用户</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="admin-card">
          <CardContent className="pt-6">
            <UserFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterRole={filterRole}
              onFilterRoleChange={setFilterRole}
              filterStatus={filterStatus}
              onFilterStatusChange={setFilterStatus}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalUsers={users.length}
              filteredCount={filteredUsers.length}
            />
          </CardContent>
        </Card>

        {/* User List */}
        <Card className="admin-card">
          <CardContent className="pt-6">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">没有找到用户</h3>
                <p className="text-muted-foreground mb-4">
                  {users.length === 0 ? '还没有任何用户' : '没有符合条件的用户'}
                </p>
                {users.length === 0 && (
                  <Button onClick={() => setShowUserForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    创建第一个用户
                  </Button>
                )}
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            ) : (
              <UserTable
                users={filteredUsers}
                onEdit={handleEditUser}
                onDelete={handleDeleteClick}
              />
            )}
          </CardContent>
        </Card>

        {/* User Form Dialog */}
        <UserForm
          open={showUserForm}
          onClose={closeUserForm}
          onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
          user={editingUser}
          loading={loading}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确认删除用户</AlertDialogTitle>
              <AlertDialogDescription>
                您确定要删除用户 "{userToDelete?.name}" 吗？此操作无法撤销。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteUser}
                className="bg-destructive hover:bg-destructive/90"
              >
                删除
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Index;