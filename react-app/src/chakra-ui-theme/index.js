import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"

import { colors } from "./colors"
import { components } from "./components"
import { layerStyles } from "./layer-styles"
import { styles } from "./styles"
import { textStyles } from "./text-styles"

const theme = extendTheme(
    {
        colors: {
            ...colors,
            primary: colors.indigo,
        },
        components,
        config: {
            initialColorMode: "system",
            useSystemColorMode: true,
        },
        fonts: {
            heading: "Averta",
            body: "Averta",
        },
        layerStyles,
        styles,
        textStyles,
    },
    withDefaultColorScheme({ colorScheme: "primary" }),
)

export { theme }
