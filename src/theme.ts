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
    primaryBrighter: string;
    primaryBright: string;
    primaryMedium: string;
    primaryDark: string;
    primaryDarker: string;

    neutralBrighter: string;
    neutralBright: string;
    neutralMedium: string;
    neutralDark: string;
    neutralDarker: string;

    warnBrighter: string;
    warnBright: string;
    warnMedium: string;
    warnDark: string;
    warnDarker: string;

    dangerBrighter: string;
    dangerBright: string;
    dangerMedium: string;
    dangerDark: string;
    dangerDarker: string;

    text: string;

    black: string;
    white: string;
    translucentMedium: string;
    translucentDeep: string;
    translucentPale: string;
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
        primaryBrighter: '#DEECEF',
        primaryBright: '#BDDADF',
        primaryMedium: '#5AA2AE',
        primaryDark: '#417B85',
        primaryDarker: '#247C89',

        neutralBrighter: '#DADADA',
        neutralBright: '#C1C1C1',
        neutralMedium: '#707070',
        neutralDark: '#505050',
        neutralDarker: '#404040',

        warnBrighter: '#FCEAD4',
        warnBright: '#FAD5A9',
        warnMedium: '#F29727',
        warnDark: '#D87E1D',
        warnDarker: '#B56415',

        dangerBrighter: '#FAD9E4',
        dangerBright: '#F4B3C8',
        dangerMedium: '#E44276',
        dangerDark: '#B12C54',
        dangerDarker: '#8F2143',

        black: '#000000',
        white: '#ffffff',
        text: '#5C5C5C',

        translucentMedium: 'rgba(88,88,88,0.2)',
        translucentDeep: 'rgba(88,88,88,0.8)',
        translucentPale: 'rgba(88,88,88,0.08)',
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
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '32px',
        xl: '64px',
    },
};

export default defaultTheme;
