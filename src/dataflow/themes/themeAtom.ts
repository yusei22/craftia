import { atom } from 'recoil';
import { Theme } from '@emotion/react'
import defaultTheme from 'theme';

const themeAtom = atom<Theme>({
    key: 'themeAtom',
    default: defaultTheme,
});

export { themeAtom };
