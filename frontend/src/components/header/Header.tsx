import { Link as RouterLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Flex, Link, Spinner, Text } from "@chakra-ui/react";
import { CalendarStar } from "@phosphor-icons/react";
import { GlobalStore } from "../../stores";
import { routes } from "../../config";
import { useGetVerifySession } from "../../hooks";
import { NotificationsBlock } from "./NotificationsBlock";
import { Logout } from "./Logout";

interface IHeader {
  globalStore: GlobalStore;
}

export const Header = observer(({ globalStore }: IHeader) => {
  const {
    loading: verifySessionLoading,
    data: verifySessionData,
    // error: verifySessionError,
  } = useGetVerifySession();

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
      <Flex alignItems="center" gap={2}>
        {verifySessionLoading ? (
          <Spinner />
        ) : verifySessionData?.verifySession?.isAuth ? (
          <NotificationsBlock />
        ) : (
          <Link asChild color="darkBlue">
            <RouterLink to={routes.login}>Войти</RouterLink>
          </Link>
        )}
        <Link asChild color="darkBlue">
          <RouterLink to={routes.profile}>
            <Flex alignItems="center" gap={1}>
              <CalendarStar weight="fill" size={24} />
              <Text fontSize="lg">{globalStore.selectedDestinations.size}</Text>
            </Flex>
          </RouterLink>
        </Link>
        {verifySessionData?.verifySession?.isAuth && <Logout />}
      </Flex>
    </Flex>
  );
});
