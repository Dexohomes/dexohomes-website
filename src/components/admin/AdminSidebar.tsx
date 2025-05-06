
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare,
  Image,
  Menu,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = React.useState(false || isMobile);

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      name: 'Leads',
      path: '/admin/leads',
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      name: 'Content',
      path: '/admin/content',
      icon: <Image className="h-5 w-5" />
    },
    {
      name: 'Reviews',
      path: '/admin/reviews',
      icon: <Star className="h-5 w-5" />
    }
  ];

  return (
    <div 
      className={cn(
        "bg-brand-dark text-white transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 flex justify-between items-center">
        {!collapsed && (
          <Link to="/admin" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="text-brand-yellow">Dexo</span>
              <span className="text-white">homes</span>
            </span>
          </Link>
        )}
        
        <Button 
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-brand-yellow/20"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                  pathname === item.path 
                    ? "bg-brand-yellow text-black" 
                    : "text-gray-300 hover:bg-white/10"
                )}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-4 left-0 w-full px-4">
        <Link 
          to="/" 
          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-colors"
        >
          {!collapsed && <span>Visit Website</span>}
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
