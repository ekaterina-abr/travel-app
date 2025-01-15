import { observer } from "mobx-react-lite";
import { Flex, Text } from "@chakra-ui/react";
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
        <Flex gap={4}>
          {[...globalStore.selectedDestinations].map((destId) => {
            const destInfo = destinations.find((_dest) => _dest.id === destId);

            if (!destInfo) return null;
            return (
              <DestinationCard
                {...destInfo}
                key={destId}
                isSelected
                onAdd={() => {}}
                onRemove={() => onRemoveDestination(destId)}
              />
            );
          })}
        </Flex>
      </Flex>
    );
  }
);
