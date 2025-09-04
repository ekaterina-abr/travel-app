import { Link as RouterLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Flex, Link, Spinner, Text } from "@chakra-ui/react";
import { CalendarStar } from "@phosphor-icons/react";
import { GlobalStore } from "../../stores";
import { routes } from "../../config";
import { Notifications } from "./Notifications";
import { useGetNotifications } from "../../hooks";

interface IHeader {
  globalStore: GlobalStore;
}

export const Header = observer(({ globalStore }: IHeader) => {
  const { data: notificationsData, isLoading: notificationsIsLoading } =
    useGetNotifications();

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
            notifications={notificationsData?.notifications ?? []}
            onMarkRead={() => {}}
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
