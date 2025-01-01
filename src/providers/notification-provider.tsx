import { createContext, useContext, useState, ReactNode } from "react";
import { SlidingNotification } from "@/components/ui/sliding-notification";

interface NotificationContextType {
  showNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const showNotification = (newMessage: string) => {
    setMessage(newMessage);
    setIsVisible(true);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <SlidingNotification
        message={message}
        isVisible={isVisible}
        onHide={() => setIsVisible(false)}
      />
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};