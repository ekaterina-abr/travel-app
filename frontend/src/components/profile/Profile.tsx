import { observer } from "mobx-react-lite";
import { Flex } from "@chakra-ui/react";
import { Header } from "../header";
import { GlobalStore } from "../../stores";
import { SelectedDestinations } from "./SelectedDestinations";

interface IProfile {
  globalStore: GlobalStore;
}

export const Profile = observer(({ globalStore }: IProfile) => {
  return (
    <>
      <Header globalStore={globalStore} />
      <Flex py={5} px={4} flexDir="column" gap={4}>
        <SelectedDestinations globalStore={globalStore} />
      </Flex>
    </>
  );
});
