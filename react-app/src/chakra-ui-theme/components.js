const Button = {
    baseStyle: {},
}

const Input = {
    parts: ["field"],
    defaultProps: {
        focusBorderColor: "primary.400",
    },
    sizes: {
        sm: {
            field: {
                borderRadius: "md",
            },
        },
    },
}

const Select = {
    parts: ["field"],
    defaultProps: {
        focusBorderColor: "primary.400",
    },
    sizes: {
        sm: {
            field: {
                borderRadius: "md",
            },
        },
    },
}

const Tooltip = {
    baseStyle: {
        maxWidth: "28em",
        marginTop: "0.5em",
        padding: "0.5em",
        borderRadius: "0.5em",
    },
}

export const components = {
    Button,
    Input,
    Select,
    Tooltip,
}
