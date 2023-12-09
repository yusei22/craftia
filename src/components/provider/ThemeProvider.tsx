import { ThemeProvider as _ThemeProvider } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { themeAtom } from 'dataflow/themes/themeAtom';

export const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
    const theme = useRecoilValue(themeAtom);

    return <_ThemeProvider theme={theme}>{children}</_ThemeProvider>;
};
