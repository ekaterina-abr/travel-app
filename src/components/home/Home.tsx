import { observer } from "mobx-react-lite";
import { Flex, Text } from "@chakra-ui/react";
import { destinations } from "../../config";
import { Header } from "../header";
import { DestinationCard } from "./DestinationCard";
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
        <Flex gap={4}>
          {destinations.map((dest) => (
            <DestinationCard
              {...dest}
              key={dest.id}
              isSelected={globalStore.selectedDestinations.has(dest.id)}
              onAdd={() => onAddDestination(dest.id)}
              onRemove={() => onRemoveDestination(dest.id)}
            />
          ))}
        </Flex>
      </Flex>
    </>
  );
});
