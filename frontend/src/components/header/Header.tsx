import { Link as RouterLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Flex, Link, Spinner, Text } from "@chakra-ui/react";
import { CalendarStar } from "@phosphor-icons/react";
import { GlobalStore } from "../../stores";
import { routes } from "../../config";
import { useGetUserInfo } from "../../hooks";
import { NotificationsBlock } from "./NotificationsBlock";
import { Logout } from "./Logout";
import { useMemo } from "react";

interface IHeader {
  globalStore: GlobalStore;
}

export const Header = observer(({ globalStore }: IHeader) => {
  const {
    loading: userInfoLoading,
    data: userInfoData,
    // error: userInfoError,
  } = useGetUserInfo();

  const isAuth = useMemo(() => !!userInfoData?.getUserInfo?.id, [userInfoData]);

  const selectedDestinations = useMemo(() => {
    console.log(
      "globalStore.selectedDestinations",
      globalStore.selectedDestinations.size
    );
    if (isAuth) {
      return userInfoData!.getUserInfo.saved_destinations;
    } else {
      return [...globalStore.selectedDestinations];
    }
  }, [
    isAuth,
    userInfoData,
    globalStore.selectedDestinations,
    globalStore.selectedDestinations.size,
  ]);

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
        {userInfoLoading ? (
          <Spinner />
        ) : isAuth ? (
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
              <Text fontSize="lg">{selectedDestinations.length}</Text>
            </Flex>
          </RouterLink>
        </Link>
        {isAuth && <Logout />}
      </Flex>
    </Flex>
  );
});
