import { observer } from "mobx-react-lite";
import { Link as RouterLink } from "react-router-dom";
import {
  Center,
  Flex,
  Grid,
  GridItem,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { GlobalStore } from "../../stores";
import { DestinationCard } from "../cards";
import {
  useGetDestinations,
  useGetUserInfo,
  useMutateUnsaveDestination,
} from "../../hooks";
import { useCallback, useEffect, useMemo } from "react";
import { removeDestination } from "../../utils";

interface ISelectedDestinations {
  globalStore: GlobalStore;
}

export const SelectedDestinations = observer(
  ({ globalStore }: ISelectedDestinations) => {
    const {
      loading: userInfoLoading,
      data: userInfoData,
      // error: userInfoError,
      refetch: userInfoRefetch,
    } = useGetUserInfo();

    const {
      data: destinationsData,
      loading: destinationsLoading,
      // error: destinationsError,
    } = useGetDestinations();

    const [
      unsaveDestination,
      {
        data: unsaveDestinationData,
        // error: unsaveDestinationError,
      },
    ] = useMutateUnsaveDestination();

    useEffect(() => {
      if (unsaveDestinationData?.unsaveDestination) {
        userInfoRefetch();
      }
    }, [userInfoRefetch, unsaveDestinationData?.unsaveDestination]);

    const isAuth = useMemo(
      () => !!userInfoData?.getUserInfo?.id,
      [userInfoData]
    );

    const selectedDestinations = useMemo(() => {
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

    const onRemoveDestination = useCallback(
      async (dest: string) =>
        await removeDestination({
          dest,
          isAuth,
          unsaveDestination,
          globalStore,
          userInfoData,
          userInfoRefetch,
        }),
      [isAuth, globalStore, unsaveDestination, userInfoData, userInfoRefetch]
    );

    return (
      <Flex flexDir="column" gap={4}>
        <Text>Добавленные направления</Text>
        {userInfoLoading || destinationsLoading ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : selectedDestinations.length === 0 ? (
          <Text>
            Пока ничего не добавлено.{" "}
            <Link asChild variant="text">
              <RouterLink to="/">Посмотреть варианты</RouterLink>
            </Link>
          </Text>
        ) : (
          <Grid
            gap={4}
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
            ]}
          >
            {selectedDestinations.map((destId) => {
              const destInfo = destinationsData?.destinations?.find(
                (_dest) => _dest.id === destId
              );

              if (!destInfo) return null;
              return (
                <GridItem h="100%" key={destId}>
                  <DestinationCard
                    {...destInfo}
                    isSelected
                    onRemove={() => onRemoveDestination(destId)}
                    onRemoveCaption=""
                    h="100%"
                  />
                </GridItem>
              );
            })}
          </Grid>
        )}
      </Flex>
    );
  }
);
