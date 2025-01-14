import { Link as RouterLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Flex, Link, Text } from "@chakra-ui/react";
import { CalendarStar } from "@phosphor-icons/react";
import { GlobalStore } from "../../stores";

interface IHeader {
  globalStore: GlobalStore;
}

export const Header = observer(({ globalStore }: IHeader) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid black"
      padding={4}
    >
      <Link as={RouterLink} href="/">
        Главная
      </Link>
      <Flex alignItems="center" gap={1}>
        <CalendarStar />
        <Text>{globalStore.selectedDestinations.size}</Text>
      </Flex>
    </Flex>
  );
});
