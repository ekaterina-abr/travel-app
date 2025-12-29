import { useEffect, useMemo, useState } from "react";
import { Notifications } from "./Notifications";
import {
  INotification,
  INotificationWSReceivedMsg,
  INotificationWSSentMsg,
} from "../../types";
import { useGetNotifications, useWebSocketClient } from "../../hooks";
import { apiUrls } from "../../api";
import { Spinner } from "@chakra-ui/react";

export const NotificationsBlock = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const { data: notificationsData, isLoading: notificationsIsLoading } =
    useGetNotifications();

  const shouldConnectWSNotifications = useMemo(
    () => !!notificationsData,
    [notificationsData]
  );

  const {
    sendJsonMessage: sendJsonMessageNotifications,
    lastJsonMessage: lastJsonMessageNotifications,
  } = useWebSocketClient<INotificationWSReceivedMsg>({
    url: apiUrls.updateNotifications,
    shouldConnect: shouldConnectWSNotifications,
  });

  useEffect(() => {
    if (
      notificationsData?.notifications &&
      notificationsData.notifications.length > 0
    ) {
      setNotifications(notificationsData.notifications);
    }
  }, [notificationsData]);

  useEffect(() => {
    if (
      lastJsonMessageNotifications &&
      lastJsonMessageNotifications.type === "new-notification" &&
      lastJsonMessageNotifications.msg
    ) {
      setNotifications((prevValue) => [
        lastJsonMessageNotifications.msg,
        ...prevValue,
      ]);
    }
  }, [lastJsonMessageNotifications]);

  const onMarkNotificationRead = (notificationId: number) => {
    sendJsonMessageNotifications<INotificationWSSentMsg>({
      type: "mark-read",
      id: notificationId,
    });
    const notificationIndex = notifications.findIndex(
      (item) => item.id === notificationId
    );
    if (notificationIndex !== -1) {
      const _notifications = [...notifications];
      _notifications[notificationIndex].isRead = true;
      setNotifications(_notifications);
    }
  };

  if (notificationsIsLoading) {
    return <Spinner />;
  }

  return (
    <Notifications
      notifications={notifications}
      onMarkRead={onMarkNotificationRead}
    />
  );
};
