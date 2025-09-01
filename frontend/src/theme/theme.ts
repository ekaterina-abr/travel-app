import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { colors } from "./colors";
import { linkRecipe } from "./recipes";

const config = defineConfig({
  theme: {
    tokens: {
      colors,
    },
    recipes: {
      link: linkRecipe,
    },
  },
  globalCss: {
    "html, body": {
      bg: "beige.50",
      color: "darkBlue",
    },
    a: { color: "blue" },
  },
});

export const theme = createSystem(defaultConfig, config);
