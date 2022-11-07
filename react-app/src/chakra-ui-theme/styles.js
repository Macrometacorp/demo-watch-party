import { mode } from "@chakra-ui/theme-tools"

export const styles = {
    global: (props) => ({
        body: {
            textRendering: "optimizeLegibility",
        },

        "::-moz-selection": {
            bgColor: mode("blackAlpha.200", "blackAlpha.900")(props),
        },

        "::selection": {
            bgColor: mode("blackAlpha.200", "blackAlpha.700")(props),
        },

        hr: {
            borderColor: mode("gray.100", "black.700")(props),
            mx: "auto",
            my: 6,
        },

        ".fullscreen-enabled": {
            overflowY: "scroll",
        },
    }),
}
