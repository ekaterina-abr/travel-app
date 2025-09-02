import { observer } from "mobx-react-lite";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Grid, GridItem, Link, Text } from "@chakra-ui/react";
import { GlobalStore } from "../../stores";
import { DestinationCard } from "../cards";
import { destinations } from "../../config";

interface ISelectedDestinations {
  globalStore: GlobalStore;
}

export const SelectedDestinations = observer(
  ({ globalStore }: ISelectedDestinations) => {
    const onRemoveDestination = (dest: string) => {
      globalStore.removeDestination(dest);
    };

    return (
      <Flex flexDir="column" gap={4}>
        <Text>Добавленные направления</Text>
        {globalStore.selectedDestinations.size === 0 ? (
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
            {[...globalStore.selectedDestinations].map((destId) => {
              const destInfo = destinations.find(
                (_dest) => _dest.id === destId
              );

              if (!destInfo) return null;
              return (
                <GridItem h="100%">
                  <DestinationCard
                    {...destInfo}
                    key={destId}
                    isSelected
                    onAdd={() => {}}
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
