import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
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

export default function UserList() {
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">用户管理</h1>
          <p className="text-muted-foreground mt-1">管理和查看所有用户信息</p>
        </div>
        <Button onClick={() => setShowUserForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          新增用户
        </Button>
      </div>

      {/* Filters */}
      <Card>
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
      <Card>
        <CardContent className="pt-6">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground">没有找到符合条件的用户</div>
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
  );
}