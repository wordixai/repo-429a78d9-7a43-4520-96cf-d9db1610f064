import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { Save, Database, Shield, Bell, Mail, Trash2 } from 'lucide-react';

export default function Settings() {
  const handleSave = () => {
    toast({
      title: '设置已保存',
      description: '系统设置已成功更新。',
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">系统设置</h1>
        <p className="text-muted-foreground mt-1">管理系统配置和参数</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              安全设置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>启用双因子认证</Label>
                <p className="text-sm text-muted-foreground">
                  为管理员账户启用额外的安全验证
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>自动锁定账户</Label>
                <p className="text-sm text-muted-foreground">
                  连续登录失败后锁定账户
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="session-timeout">会话超时 (分钟)</Label>
              <Input id="session-timeout" defaultValue="30" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password-policy">密码最小长度</Label>
              <Input id="password-policy" defaultValue="8" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              通知设置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>新用户注册通知</Label>
                <p className="text-sm text-muted-foreground">
                  有新用户注册时发送通知
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>权限变更通知</Label>
                <p className="text-sm text-muted-foreground">
                  用户权限发生变更时通知
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>系统维护通知</Label>
                <p className="text-sm text-muted-foreground">
                  系统维护前提前通知用户
                </p>
              </div>
              <Switch />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-email">管理员邮箱</Label>
              <Input id="admin-email" defaultValue="admin@example.com" />
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              邮件配置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-server">SMTP 服务器</Label>
              <Input id="smtp-server" placeholder="smtp.example.com" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-port">端口</Label>
                <Input id="smtp-port" defaultValue="587" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-security">加密方式</Label>
                <Input id="smtp-security" defaultValue="TLS" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="smtp-username">用户名</Label>
              <Input id="smtp-username" placeholder="your-email@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="smtp-password">密码</Label>
              <Input id="smtp-password" type="password" placeholder="••••••••" />
            </div>

            <Button variant="outline" className="w-full">
              测试邮件配置
            </Button>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              数据库维护
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">数据备份</h4>
                  <p className="text-sm text-muted-foreground">
                    上次备份: 2024-03-15 02:00
                  </p>
                </div>
                <Button variant="outline">立即备份</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">数据库优化</h4>
                  <p className="text-sm text-muted-foreground">
                    优化数据库性能和存储
                  </p>
                </div>
                <Button variant="outline">开始优化</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">清理日志</h4>
                  <p className="text-sm text-muted-foreground">
                    清理30天前的系统日志
                  </p>
                </div>
                <Button variant="outline">
                  <Trash2 className="h-4 w-4 mr-2" />
                  清理
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>自动备份设置</Label>
              <div className="flex items-center space-x-2">
                <Switch />
                <span className="text-sm">每日自动备份</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-end space-x-4">
            <Button variant="outline">重置设置</Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              保存设置
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}