import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  Users,
  UserPlus,
  Activity,
  TrendingUp,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function Dashboard() {
  const { users, initializeUsers } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    initializeUsers();
  }, [initializeUsers]);

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    pending: users.filter(u => u.status === 'pending').length,
    admins: users.filter(u => u.role === 'admin').length,
    recentLogins: users.filter(u => u.lastLogin && 
      new Date(u.lastLogin) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length
  };

  const recentUsers = users
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">欢迎回来！</h1>
            <p className="text-blue-100 mt-2">
              今天是 {new Date().toLocaleDateString('zh-CN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-blue-100">总用户数</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
              <Progress value={(stats.active / stats.total) * 100} className="flex-1" />
              <span>{Math.round((stats.active / stats.total) * 100)}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待审核</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">
              需要您的审核
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">管理员</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.admins}</div>
            <p className="text-xs text-muted-foreground">
              系统管理员
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">近期登录</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.recentLogins}</div>
            <p className="text-xs text-muted-foreground">
              过去7天
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              快速操作
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full justify-start" 
              onClick={() => navigate('/users/create')}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              创建新用户
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/users')}
            >
              <Users className="mr-2 h-4 w-4" />
              管理用户
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/analytics')}
            >
              <Activity className="mr-2 h-4 w-4" />
              查看统计
            </Button>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              最近用户
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">
                      {user.name.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{user.department}</p>
                    <p className="text-xs text-muted-foreground">{user.createdAt}</p>
                  </div>
                </div>
              ))}
              {recentUsers.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  暂无用户数据
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-600" />
              系统警告
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">权限配置提醒</p>
                  <p className="text-xs text-muted-foreground">
                    有 {stats.pending} 个用户等待权限审核
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">数据备份</p>
                  <p className="text-xs text-muted-foreground">
                    上次备份: 2024-03-15 02:00
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
              系统状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">数据库连接</span>
                <span className="text-sm text-green-600 flex items-center">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                  正常
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">用户服务</span>
                <span className="text-sm text-green-600 flex items-center">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                  运行中
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">权限系统</span>
                <span className="text-sm text-green-600 flex items-center">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                  正常
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}