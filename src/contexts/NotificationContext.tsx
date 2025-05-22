import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { ToastAction } from '@/components/ui/toast';

export type NotificationType = 'task' | 'reward' | 'achievement' | 'system' | 'community' | 'info';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  timestamp: Date;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const addNotification = (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      timestamp: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notifications
    toast({
      title: notification.title,
      description: (
        <div className="flex items-center gap-2">
          <Badge variant={
            notification.type === 'achievement' ? 'purple' :
            notification.type === 'reward' ? 'eco' :
            notification.type === 'community' ? 'info' :
            'default'
          }>
            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
          </Badge>
          <span>{notification.message}</span>
        </div>
      ),
      action: notification.action ? (
        <ToastAction 
          altText={notification.action.label}
          onClick={notification.action.onClick}
        >
          {notification.action.label}
        </ToastAction>
      ) : undefined,
    });
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };
  
  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  // Add a demo notification after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        title: 'Welcome to GreenTask 2.0',
        message: 'Check out our new features and enhanced eco-impact tracking!',
        type: 'system',
      });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        unreadCount,
        addNotification, 
        markAsRead, 
        markAllAsRead,
        clearNotification,
        clearAllNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
