import { Box, IconButton, Text } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import { IDestination } from "../../types";

export const DestinationCard = ({ title, description }: IDestination) => {
  const onAddDestination = () => {
    // TODO: add
  };

  return (
    <Box
      border="1px solid"
      borderColor="blue"
      borderRadius="md"
      w="200px"
      minH="150px"
      p={4}
    >
      <Text fontSize="lg">{title}</Text>
      <Text>{description}</Text>
      <IconButton
        onClick={onAddDestination}
        rounded="full"
        variant="subtle"
        size="xs"
      >
        <Plus color="black" />
      </IconButton>
    </Box>
  );
};
