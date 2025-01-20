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
      <Link asChild color="darkBlue">
        <RouterLink to="/">Главная</RouterLink>
      </Link>
      <Link asChild color="darkBlue">
        <RouterLink to="/profile">
          <Flex alignItems="center" gap={1}>
            <CalendarStar weight="fill" size={24} />
            <Text fontSize="lg">{globalStore.selectedDestinations.size}</Text>
          </Flex>
        </RouterLink>
      </Link>
    </Flex>
  );
});
