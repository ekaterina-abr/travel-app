import { Link as RouterLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Flex, Link, Spinner, Text } from "@chakra-ui/react";
import { CalendarStar } from "@phosphor-icons/react";
import { GlobalStore } from "../../stores";
import { routes } from "../../config";
import { Notifications } from "./Notifications";
import { useGetNotifications, useWebSocketClient } from "../../hooks";
import { apiUrls } from "../../api";
import { useEffect, useMemo, useState } from "react";
import {
  INotification,
  INotificationWSReceivedMsg,
  INotificationWSSentMsg,
} from "../../types";

interface IHeader {
  globalStore: GlobalStore;
}

export const Header = observer(({ globalStore }: IHeader) => {
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

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid black"
      padding={4}
    >
      <Link asChild color="darkBlue">
        <RouterLink to="/">Главная</RouterLink>
      </Link>
      <Flex alignItems="center" gap={4}>
        {notificationsIsLoading ? (
          <Spinner />
        ) : (
          <Notifications
            notifications={notifications}
            onMarkRead={onMarkNotificationRead}
          />
        )}
        <Link asChild color="darkBlue">
          <RouterLink to={routes.profile}>
            <Flex alignItems="center" gap={1}>
              <CalendarStar weight="fill" size={24} />
              <Text fontSize="lg">{globalStore.selectedDestinations.size}</Text>
            </Flex>
          </RouterLink>
        </Link>
      </Flex>
    </Flex>
  );
});
