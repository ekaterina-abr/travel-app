import { Flex, FlexProps, IconButton, Text } from "@chakra-ui/react";
import { IconProps, Plus, Trash } from "@phosphor-icons/react";
import * as flags from "country-flag-icons/react/3x2";
import { IDestinationResponse } from "../../types";

interface IDestinationCard
  extends IDestinationResponse,
    Omit<FlexProps, "title"> {
  onAdd?: () => void;
  onRemove?: () => void;
  onRemoveCaption?: string;
}

const flagStyle: React.SVGAttributes<SVGElement> = { width: 16 };

export const DestinationCard = ({
  title,
  description,
  isSelected = false,
  isoCode,
  onAdd = () => {},
  onRemove = () => {},
  onRemoveCaption = "Добавлено",
  id,
  ...other
}: IDestinationCard) => {
  const toggleIconStyles: IconProps = { color: "black" };
  const Flag = isoCode ? flags[isoCode as keyof typeof flags] : undefined;

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
      id={`destination-card-${id}`}
      {...other}
    >
      <Flex flexDir="column" gap={3}>
        <Flex gap={3} alignItems="center">
          <Text fontSize="lg">{title}</Text>
          {Flag && <Flag {...flagStyle} />}
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
