import { Theme } from '@emotion/react';

declare module '@emotion/react' {
    interface Theme {
        name: 'DEFAULT' | 'DARK';
        colors: Colors;
        fontSize: FontSizes;
        letterSpacing: LetterSpacings;
        lineHeights: LineHeights;
        space: Space;
    }
}
interface Colors {
    primary100: string;
    primary200: string;
    primary300: string;
    primary400: string;
    primary500: string;
    primary600: string;
    primary700: string;
    primary800: string;
    primary900: string;

    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral500: string;
    neutral600: string;
    neutral700: string;
    neutral800: string;
    neutral900: string;

    warn100: string;
    warn200: string;
    warn300: string;
    warn400: string;
    warn500: string;
    warn600: string;
    warn700: string;
    warn800: string;
    warn900: string;

    danger100: string;
    danger200: string;
    danger300: string;
    danger400: string;
    danger500: string;
    danger600: string;
    danger700: string;
    danger800: string;
    danger900: string;

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

export const defaultTheme: Theme = {
    name: 'DEFAULT',
    colors: {
        primary100: '#FDFDFD',
        primary200: '#e7f3f5',
        primary300: '#809BA0',
        primary400: '#4D6E73',
        primary500: '#1A3F43',
        primary600: '#5AA2AE',
        primary700: '#2a8897',
        primary800: '#005359',
        primary900: '#002B2F',

        neutral100: '#ffffff',
        neutral200: '#fbfbfb',
        neutral300: '#ededed',
        neutral400: '#dddddd',
        neutral500: '#bbbaba',
        neutral600: '#a6a4a4',
        neutral700: '#696969',
        neutral800: '#4f4e4e',
        neutral900: '#404040',

        warn100: '#f9f4ed',
        warn200: '#F9E2C8',
        warn300: '#FAD5A9',
        warn400: '#F7B15B',
        warn500: '#F29727',
        warn600: '#E58B1C',
        warn700: '#D87E1D',
        warn800: '#BD6E18',
        warn900: '#914e0e',

        danger100: '#FAD9E4',
        danger200: '#F4B3C8',
        danger300: '#F596B5',
        danger400: '#EC6C95',
        danger500: '#E44276',
        danger600: '#CE436D',
        danger700: '#B12C54',
        danger800: '#911F43',
        danger900: '#71122F',

        black: '#000000',
        white: '#ffffff',
        text: '#454545',

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

export const darkTheme: Theme = {
    name: 'DARK',
    colors: {
        primary100: '#002B2F',
        primary200: '#005359',
        primary300: '#2D7B87',
        primary400: '#5AA2AE',
        primary500: '#1A3F43',
        primary600: '#4D6E73',
        primary700: '#809BA0',
        primary800: '#B3C8CC',
        primary900: '#FDFDFD',

        neutral100: '#404040',
        neutral200: '#4f4e4e',
        neutral300: '#696969',
        neutral400: '#a6a4a4',
        neutral500: '#bbbaba',
        neutral600: '#d3d2d2',
        neutral700: '#d5d5d5',
        neutral800: '#e9e8e8',
        neutral900: '#f9f9f9',

        warn100: '#f9f4ed',
        warn200: '#F9E2C8',
        warn300: '#FAD5A9',
        warn400: '#F7B15B',
        warn500: '#F29727',
        warn600: '#E58B1C',
        warn700: '#D87E1D',
        warn800: '#BD6E18',
        warn900: '#914e0e',

        danger100: '#FAD9E4',
        danger200: '#F4B3C8',
        danger300: '#F596B5',
        danger400: '#EC6C95',
        danger500: '#E44276',
        danger600: '#CE436D',
        danger700: '#B12C54',
        danger800: '#911F43',
        danger900: '#71122F',

        black: '#000000',
        white: '#ffffff',
        text: '#ededed',

        translucentMedium: '#ffffff33',
        translucentDeep: '#ffffffcc',
        translucentPale: '#ffffff14',
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
