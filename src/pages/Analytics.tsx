import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';
import { BarChart3, Users, Building, TrendingUp, Calendar, PieChart } from 'lucide-react';

export default function Analytics() {
  const { users, initializeUsers } = useUserStore();

  useEffect(() => {
    initializeUsers();
  }, [initializeUsers]);

  // 统计数据计算
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    pending: users.filter(u => u.status === 'pending').length,
    admins: users.filter(u => u.role === 'admin').length,
    moderators: users.filter(u => u.role === 'moderator').length,
    regularUsers: users.filter(u => u.role === 'user').length,
  };

  // 部门统计
  const departmentStats = users.reduce((acc, user) => {
    acc[user.department] = (acc[user.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 月度注册趋势（模拟数据）
  const monthlyData = [
    { month: '1月', users: 12 },
    { month: '2月', users: 19 },
    { month: '3月', users: 8 },
    { month: '4月', users: 15 },
    { month: '5月', users: 22 },
    { month: '6月', users: 18 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">数据统计</h1>
        <p className="text-muted-foreground mt-1">用户数据分析与统计报告</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总用户数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% 相比上月
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃率</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((stats.active / stats.total) * 100)}%</div>
            <Progress value={(stats.active / stats.total) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月新增</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              比上月增长 12%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">部门数量</CardTitle>
            <Building className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(departmentStats).length}</div>
            <p className="text-xs text-muted-foreground">
              覆盖所有主要部门
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5" />
              用户状态分布
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">活跃用户</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{stats.active}</span>
                  <span className="text-xs text-muted-foreground">
                    ({Math.round((stats.active / stats.total) * 100)}%)
                  </span>
                </div>
              </div>
              <Progress value={(stats.active / stats.total) * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">待审核</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{stats.pending}</span>
                  <span className="text-xs text-muted-foreground">
                    ({Math.round((stats.pending / stats.total) * 100)}%)
                  </span>
                </div>
              </div>
              <Progress value={(stats.pending / stats.total) * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">停用用户</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{stats.inactive}</span>
                  <span className="text-xs text-muted-foreground">
                    ({Math.round((stats.inactive / stats.total) * 100)}%)
                  </span>
                </div>
              </div>
              <Progress value={(stats.inactive / stats.total) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Role Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              角色分布
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">管理员</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{stats.admins}</span>
                  <span className="text-xs text-muted-foreground">
                    ({Math.round((stats.admins / stats.total) * 100)}%)
                  </span>
                </div>
              </div>
              <Progress value={(stats.admins / stats.total) * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">版主</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{stats.moderators}</span>
                  <span className="text-xs text-muted-foreground">
                    ({Math.round((stats.moderators / stats.total) * 100)}%)
                  </span>
                </div>
              </div>
              <Progress value={(stats.moderators / stats.total) * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
                  <span className="text-sm">普通用户</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{stats.regularUsers}</span>
                  <span className="text-xs text-muted-foreground">
                    ({Math.round((stats.regularUsers / stats.total) * 100)}%)
                  </span>
                </div>
              </div>
              <Progress value={(stats.regularUsers / stats.total) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="mr-2 h-5 w-5" />
            部门用户分布
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(departmentStats).map(([department, count]) => (
              <div key={department} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{department}</h3>
                  <span className="text-sm text-muted-foreground">{count} 人</span>
                </div>
                <Progress value={(count / stats.total) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  占总数 {Math.round((count / stats.total) * 100)}%
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Growth Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            月度增长趋势
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center space-x-4">
                <div className="w-12 text-sm text-muted-foreground">{data.month}</div>
                <div className="flex-1">
                  <Progress value={(data.users / 25) * 100} className="h-3" />
                </div>
                <div className="w-12 text-sm font-medium text-right">{data.users}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}