import { defineRecipe } from "@chakra-ui/react";

export const linkRecipe = defineRecipe({
  base: {
    _focus: {
      outline: "none",
    },
  },
  variants: {
    variant: {
      text: {
        color: "blue",
        textDecoration: "underline",
        _hover: {
          color: "blue.60",
        },
      },
    },
  },
});
