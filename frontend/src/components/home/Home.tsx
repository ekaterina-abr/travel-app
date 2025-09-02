import { observer } from "mobx-react-lite";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Grid, GridItem, Link, Spinner, Text } from "@chakra-ui/react";
import { routes } from "../../config";
import { Header } from "../header";
import { DestinationCard } from "../cards";
import { GlobalStore } from "../../stores";
import { useGetDestinations } from "../../hooks";

interface IHome {
  globalStore: GlobalStore;
}

export const Home = observer(({ globalStore }: IHome) => {
  const { data: destinationsData, isLoading: destinationsIsLoading } =
    useGetDestinations();

  const onAddDestination = (dest: string) => {
    globalStore.addDestination(dest);
  };
  const onRemoveDestination = (dest: string) => {
    globalStore.removeDestination(dest);
  };

  return (
    <>
      <Header globalStore={globalStore} />
      <Flex py={5} px={4} flexDir="column" gap={4}>
        <Text>Направления</Text>
        <Link asChild variant="text">
          <RouterLink to={routes.profile}>Посмотреть добавленные</RouterLink>
        </Link>
        {destinationsIsLoading ? (
          <Spinner />
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
                  isSelected={globalStore.selectedDestinations.has(dest.id)}
                  onAdd={() => onAddDestination(dest.id)}
                  onRemove={() => onRemoveDestination(dest.id)}
                  h="100%"
                />
              </GridItem>
            ))}
          </Grid>
        )}
      </Flex>
    </>
  );
});
