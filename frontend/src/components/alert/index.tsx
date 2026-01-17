import { Alert } from "@chakra-ui/react";
import { baseErrorMsg } from "../../config";

interface IErrorAlert {
  text?: string;
}

export const ErrorAlert = ({ text = baseErrorMsg }: IErrorAlert) => (
  <Alert.Root
    status="warning"
    variant="solid"
    position="fixed"
    top={0}
    left={0}
    width="100%"
    borderRadius={0}
    fontSize="md"
    justifyContent="center"
  >
    <Alert.Indicator />
    <Alert.Content flex="none">
      <Alert.Title whiteSpace="nowrap">{text}</Alert.Title>
    </Alert.Content>
  </Alert.Root>
);
