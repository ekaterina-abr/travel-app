import { Link as RouterLink } from "react-router-dom";
import { Box, Link } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Box borderBottom="1px solid black" padding={4}>
      <Link as={RouterLink} href="/">
        Главная
      </Link>
    </Box>
  );
};
