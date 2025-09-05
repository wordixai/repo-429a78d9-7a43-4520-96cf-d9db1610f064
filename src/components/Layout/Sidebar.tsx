import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Users,
  BarChart3,
  Settings,
  Shield,
  UserPlus,
  Activity,
  Building,
  Home,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  {
    title: '仪表板',
    icon: Home,
    href: '/',
    description: '系统概览'
  },
  {
    title: '用户管理',
    icon: Users,
    href: '/users',
    description: '管理所有用户'
  },
  {
    title: '新增用户',
    icon: UserPlus,
    href: '/users/create',
    description: '创建新用户'
  },
  {
    title: '角色权限',
    icon: Shield,
    href: '/roles',
    description: '管理角色权限'
  },
  {
    title: '部门管理',
    icon: Building,
    href: '/departments',
    description: '组织架构管理'
  },
  {
    title: '活动日志',
    icon: Activity,
    href: '/logs',
    description: '查看系统日志'
  },
  {
    title: '数据统计',
    icon: BarChart3,
    href: '/analytics',
    description: '数据分析报告'
  },
  {
    title: '系统设置',
    icon: Settings,
    href: '/settings',
    description: '系统配置'
  }
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "flex flex-col border-r bg-card transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">用户管理</h2>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 p-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-auto p-3",
                    collapsed && "px-2",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 shrink-0",
                    !collapsed && "mr-3"
                  )} />
                  {!collapsed && (
                    <div className="flex-1 text-left">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        {!collapsed && (
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 用户管理系统</p>
            <p>版本 v1.0.0</p>
          </div>
        )}
      </div>
    </div>
  );
}