import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { colors } from "./colors";
import { fieldRecipe, linkRecipe } from "./recipes";

const config = defineConfig({
  theme: {
    tokens: {
      colors,
    },
    recipes: {
      link: linkRecipe,
    },
    slotRecipes: {
      field: fieldRecipe,
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

const theme = createSystem(defaultConfig, config);
export default theme;
