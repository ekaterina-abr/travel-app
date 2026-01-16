import { useCallback, useEffect, useMemo, useState } from "react";
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
import { routes } from "../../config";
import { DestinationCard } from "../cards";
import { GlobalStore } from "../../stores";
import {
  useGetDestinations,
  useGetUserInfo,
  useMutateSaveDestinations,
  useMutateUnsaveDestination,
} from "../../hooks";
import { addDestination, removeDestination } from "../../utils";

interface IHome {
  globalStore: GlobalStore;
}

export const Home = observer(({ globalStore }: IHome) => {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    []
  );
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
    saveDestinations,
    {
      data: saveDestinationsData,
      // error: saveDestinationsError,
    },
  ] = useMutateSaveDestinations();

  const [
    unsaveDestination,
    {
      data: unsaveDestinationData,
      // error: unsaveDestinationError,
    },
  ] = useMutateUnsaveDestination();

  // receive destinations from db
  useEffect(() => {
    if (
      userInfoData?.getUserInfo?.saved_destinations?.length &&
      destinationsData?.destinations
    ) {
      setSelectedDestinations(userInfoData.getUserInfo.saved_destinations);
    }
  }, [userInfoData, destinationsData]);

  // update destinations state after saving to db
  useEffect(() => {
    if (saveDestinationsData?.saveDestinations?.savedDestinations) {
      setSelectedDestinations((prev) => [
        ...prev,
        ...saveDestinationsData.saveDestinations.savedDestinations,
      ]);
    }
  }, [saveDestinationsData]);

  // update destinations state after deleting from db
  useEffect(() => {
    if (unsaveDestinationData?.unsaveDestination?.unsavedDestination) {
      setSelectedDestinations((prev) =>
        prev.filter(
          (dest) =>
            dest !== unsaveDestinationData.unsaveDestination.unsavedDestination
        )
      );
    }
  }, [unsaveDestinationData]);

  const isAuth = useMemo(() => {
    console.log("return isAuth", !!userInfoData?.getUserInfo?.id);
    return !!userInfoData?.getUserInfo?.id;
  }, [userInfoData]);

  const onAddDestination = useCallback(
    async (dest: string) =>
      await addDestination({
        dest,
        isAuth,
        saveDestinations,
        globalStore,
        userInfoData,
        userInfoRefetch,
      }),
    [isAuth, saveDestinations, globalStore, userInfoData, userInfoRefetch]
  );

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
    [isAuth, unsaveDestination, globalStore, userInfoData, userInfoRefetch]
  );

  return (
    <Flex py={5} px={4} flexDir="column" gap={4}>
      <Text>Направления</Text>
      <Link asChild variant="text">
        <RouterLink to={routes.profile}>Посмотреть добавленные</RouterLink>
      </Link>
      {destinationsLoading || userInfoLoading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
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
          {destinationsData?.destinations?.map((dest) => (
            <GridItem h="100%" key={dest.id}>
              <DestinationCard
                {...dest}
                isSelected={
                  isAuth
                    ? selectedDestinations.includes(dest.id)
                    : globalStore.selectedDestinations.has(dest.id)
                }
                onAdd={() => onAddDestination(dest.id)}
                onRemove={() => onRemoveDestination(dest.id)}
                h="100%"
              />
            </GridItem>
          ))}
        </Grid>
      )}
    </Flex>
  );
});
