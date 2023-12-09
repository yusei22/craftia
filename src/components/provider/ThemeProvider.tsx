import { themeAtom } from "dataflow/themes/themeAtom";
import { useRecoilValue } from "recoil";
import { ThemeProvider as _ThemeProvider } from '@emotion/react';

export const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
    const theme = useRecoilValue(themeAtom);


    return (
        <_ThemeProvider theme={theme}>
            {children}
        </_ThemeProvider>
    )
}