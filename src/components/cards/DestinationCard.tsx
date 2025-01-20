import { Flex, FlexProps, IconButton, Text } from "@chakra-ui/react";
import { IconProps, Plus, Trash } from "@phosphor-icons/react";
import { IDestination } from "../../types";

interface IDestinationCard
  extends IDestination,
    Omit<FlexProps, "id" | "title"> {
  onAdd: () => void;
  onRemove: () => void;
  onRemoveCaption?: string;
}

export const DestinationCard = ({
  title,
  description,
  isSelected = false,
  flag,
  onAdd,
  onRemove,
  onRemoveCaption = "Добавлено",
  ...other
}: IDestinationCard) => {
  const toggleIconStyles: IconProps = { color: "black" };

  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      gap={3}
      bg="blue.60"
      borderRadius="md"
      color="white"
      minW="200px"
      minH="150px"
      p={4}
      {...other}
    >
      <Flex flexDir="column" gap={3}>
        <Flex gap={3} alignItems="center">
          <Text fontSize="lg">{title}</Text>
          {flag}
        </Flex>
        <Text fontSize="sm">{description}</Text>
      </Flex>

      {isSelected ? (
        <Flex alignItems="center" gap={2}>
          <Text fontSize="sm">{onRemoveCaption}</Text>
          <IconButton
            onClick={onRemove}
            rounded="full"
            variant="subtle"
            size="xs"
          >
            <Trash />
          </IconButton>
        </Flex>
      ) : (
        <IconButton onClick={onAdd} rounded="full" variant="subtle" size="xs">
          <Plus {...toggleIconStyles} />
        </IconButton>
      )}
    </Flex>
  );
};
