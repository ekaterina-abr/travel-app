import { Flex, Text } from "@chakra-ui/react";
import { destinations } from "../../config";
import { Header } from "../header";
import { DestinationCard } from "./DestinationCard";

export const Home = () => {
  return (
    <>
      <Header />
      <Flex py={5} px={4} flexDir="column" gap={4}>
        <Text>Направления</Text>
        <Flex gap={4}>
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} {...dest} />
          ))}
        </Flex>
      </Flex>
    </>
  );
};
