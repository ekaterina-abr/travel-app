import { observer } from "mobx-react-lite";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Link, Text } from "@chakra-ui/react";
import { GlobalStore } from "../../stores";
import { DestinationCard } from "../cards";
import { destinations } from "../../config";
import { DestinationId } from "../../types";

interface ISelectedDestinations {
  globalStore: GlobalStore;
}

export const SelectedDestinations = observer(
  ({ globalStore }: ISelectedDestinations) => {
    const onRemoveDestination = (dest: DestinationId) => {
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
          <Flex gap={4}>
            {[...globalStore.selectedDestinations].map((destId) => {
              const destInfo = destinations.find(
                (_dest) => _dest.id === destId
              );

              if (!destInfo) return null;
              return (
                <DestinationCard
                  {...destInfo}
                  key={destId}
                  isSelected
                  onAdd={() => {}}
                  onRemove={() => onRemoveDestination(destId)}
                  onRemoveCaption=""
                />
              );
            })}
          </Flex>
        )}
      </Flex>
    );
  }
);
