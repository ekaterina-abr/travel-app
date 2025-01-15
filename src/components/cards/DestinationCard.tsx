import { Box, IconButton, Text } from "@chakra-ui/react";
import { IconProps, Minus, Plus } from "@phosphor-icons/react";
import { IDestination } from "../../types";

interface IDestinationCard extends IDestination {
  onAdd: () => void;
  onRemove: () => void;
}

export const DestinationCard = ({
  title,
  description,
  isSelected = false,
  onAdd,
  onRemove,
}: IDestinationCard) => {
  const toggleIconStyles: IconProps = { color: "black" };

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
        onClick={isSelected ? onRemove : onAdd}
        rounded="full"
        variant="subtle"
        size="xs"
      >
        {isSelected ? (
          <Minus {...toggleIconStyles} />
        ) : (
          <Plus {...toggleIconStyles} />
        )}
      </IconButton>
    </Box>
  );
};
