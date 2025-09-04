import { Button, Menu, Portal, SelectionDetails } from "@chakra-ui/react";
import { BellSimple } from "@phosphor-icons/react";
import { INotification } from "../../types";

interface INotifications {
  notifications: INotification[];
  onMarkRead: (id: number) => void;
}

export const Notifications = ({
  notifications,
  onMarkRead,
}: INotifications) => {
  const onSelect = (details: SelectionDetails) => {
    console.log("details", details);
    const notificationId = Number(details.value.split("-")[1]);
    if (
      notificationId &&
      notifications.find((item) => item.id === notificationId)?.isRead === false
    ) {
      onMarkRead(notificationId);
    }
  };

  return (
    <Menu.Root onSelect={onSelect}>
      <Menu.Trigger asChild>
        <Button variant="outline" size="md">
          <BellSimple weight="fill" />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {notifications.map((notification) => (
              <Menu.Item
                key={`notification-${notification.id}`}
                value={`notification-${notification.id}`}
                closeOnSelect={false}
                bg={notification.isRead ? "white" : "grey"}
                _hover={{
                  bg: notification.isRead ? "white" : "beige.50",
                  cursor: !notification.isRead && "pointer",
                }}
              >
                {notification.text}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
