import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import CreateUser from "./pages/CreateUser";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/create" element={<CreateUser />} />
          <Route path="roles" element={<div className="p-6"><h1 className="text-2xl font-bold">角色权限管理</h1><p className="text-muted-foreground">功能开发中...</p></div>} />
          <Route path="departments" element={<div className="p-6"><h1 className="text-2xl font-bold">部门管理</h1><p className="text-muted-foreground">功能开发中...</p></div>} />
          <Route path="logs" element={<div className="p-6"><h1 className="text-2xl font-bold">活动日志</h1><p className="text-muted-foreground">功能开发中...</p></div>} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;