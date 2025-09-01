import { observer } from "mobx-react-lite";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Grid, GridItem, Link, Text } from "@chakra-ui/react";
import { destinations, routes } from "../../config";
import { Header } from "../header";
import { DestinationCard } from "../cards";
import { GlobalStore } from "../../stores";
import { DestinationId } from "../../types";

interface IHome {
  globalStore: GlobalStore;
}

export const Home = observer(({ globalStore }: IHome) => {
  const onAddDestination = (dest: DestinationId) => {
    globalStore.addDestination(dest);
  };
  const onRemoveDestination = (dest: DestinationId) => {
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
        <Grid
          gap={4}
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
        >
          {destinations.map((dest) => (
            <GridItem h="100%">
              <DestinationCard
                {...dest}
                key={dest.id}
                isSelected={globalStore.selectedDestinations.has(dest.id)}
                onAdd={() => onAddDestination(dest.id)}
                onRemove={() => onRemoveDestination(dest.id)}
                h="100%"
              />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </>
  );
});
