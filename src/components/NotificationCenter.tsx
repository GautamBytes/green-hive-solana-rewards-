
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Check, Trash2, Award, MessageCircle, Coins, Info } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { motion } from 'framer-motion';

const NotificationCenter = () => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearNotification,
    clearAllNotifications 
  } = useNotifications();
  const [open, setOpen] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Award className="h-5 w-5 text-purple-500" />;
      case 'reward':
        return <Coins className="h-5 w-5 text-yellow-500" />;
      case 'community':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-green-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <DropdownMenuLabel className="flex justify-between items-center p-3">
          <span>Notifications</span>
          {notifications.length > 0 && (
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => {
                  markAllAsRead();
                }}
              >
                <Check className="h-3.5 w-3.5 mr-1" />
                Mark all read
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7"
                onClick={() => {
                  clearAllNotifications();
                }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </DropdownMenuLabel>
        
        <ScrollArea className="h-[300px] p-0">
          <DropdownMenuGroup>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <React.Fragment key={notification.id}>
                  <DropdownMenuItem
                    className={`flex items-start gap-3 p-3 cursor-pointer relative ${
                      !notification.read ? 'bg-green-50 dark:bg-green-900/20' : ''
                    }`}
                    onClick={() => {
                      if (!notification.read) markAsRead(notification.id);
                      if (notification.action) notification.action.onClick();
                    }}
                  >
                    {!notification.read && (
                      <div className="absolute top-3 left-3 h-2 w-2 rounded-full bg-green-500" />
                    )}
                    
                    <div className={`mt-0.5 ${!notification.read ? 'ml-4' : ''}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-medium text-sm">{notification.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {notification.message}
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-green-500 dark:text-green-400">
                          {formatTime(notification.timestamp)}
                        </span>
                        
                        {notification.action && (
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="h-auto p-0 text-xs text-green-600 dark:text-green-400"
                          >
                            {notification.action.label}
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 opacity-50 hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearNotification(notification.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </React.Fragment>
              ))
            ) : (
              <div className="py-8 px-4 text-center text-muted-foreground">
                <Bell className="h-6 w-6 mx-auto mb-2 opacity-30" />
                <p>No notifications yet</p>
              </div>
            )}
          </DropdownMenuGroup>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationCenter;
