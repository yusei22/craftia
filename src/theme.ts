import { extendTheme } from "@mui/joy/styles";

declare module '@mui/joy/styles' {
    interface PaletteTextOverrides {
        whiten: true;
    }
}

const theme = extendTheme({
    "colorSchemes": {
        "light": {
            "palette": {
                "neutral": {
                    "50": "#FCFCFC",
                    "100": "#E0E0E0",
                    "200": "#C4C4C4",
                    "300": "#A8A8A8",
                    "400": "#8C8C8C",
                    "500": "#707070",
                    "600": "#545454",
                    "700": "#383838",
                    "800": "#1C1C1C",
                    "900": "#000000 "
                },
                "primary": {
                    "50": "#F7FCFC",
                    "100": "#d0f5ef",
                    "200": "#9EE6D5",
                    "300": "#7CBCC1",
                    "400": "#5AA2AE",
                    "500": "#4C8E98",
                    "600": "#3E7B82",
                    "700": "#30676B",
                    "800": "#225356",
                    "900": "#143040"
                },
                "text": {
                    "whiten": "#fafafa"
                }
            }
        },
        "dark": {
            "palette": {
                "text": {
                    "whiten": "#fafafa"
                }
            }
        }
    }
})

export default theme;