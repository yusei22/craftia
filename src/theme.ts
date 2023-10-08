import { Theme } from '@emotion/react';

declare module '@emotion/react' {
    interface Theme {
        colors: Colors;
        fontSize: FontSizes;
        letterSpacing: LetterSpacings;
        lineHeights: LineHeights;
        space: Space;
    }
}
interface Colors {
    primary: string;
    primaryDark: string;
    primaryLight: string;

    neutral: string;
    neutralDark: string;
    neutralLight: string;

    warn: string;
    warnLight: string;
    warnDark: string;

    danger: string;
    dangerDark: string;
    dangerLight: string;

    text: string;

    black: string;
    white: string;
}

interface FontSizes {
    xs: string;
    sm: string;
    md: string;
    md2: string;
    lg: string;
    xl: string;
}
interface LetterSpacings {
    xs: string;
    sm: string;
    md: string;
    md2: string;
    lg: string;
    xl: string;
}
interface LineHeights {
    xs: string;
    sm: string;
    md: string;
    md2: string;
    lg: string;
    xl: string;
}
interface Space {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
}

const defaultTheme: Theme = {
    colors: {
        primary: ' #5AA2AE',
        primaryDark: '#30676b',
        primaryLight: '#d0f5ef',

        neutral: '#707070',
        neutralDark: '#383838',
        neutralLight: '#E0E0E0',

        warnLight: '#FBDCB7',
        warn: '#F29727',
        warnDark: '#9A5B13',

        dangerLight: '#fcd2df',
        danger: '#E44276',
        dangerDark: '#9e2048',

        black: '#000000',
        white: '#ffffff',
        text: '#5C5C5C',
    },
    fontSize: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        md2: '20px',
        lg: '24px',
        xl: '32px',
    },
    letterSpacing: {
        xs: '0.06px',
        sm: '0.07px',
        md: '0.08px',
        md2: '0.09px',
        lg: '0.1px',
        xl: '0.1px',
    },
    lineHeights: {
        xs: '17px',
        sm: '19px',
        md: '22px',
        md2: '26px',
        lg: '28px',
        xl: '37px',
    },
    space: {
        xs: '0px',
        sm: '8px',
        md: '16px',
        lg: '32px',
        xl: '64px',
    },
};

export default defaultTheme;
