import { Theme } from '@emotion/react';
import { atom } from 'recoil';
import { defaultTheme } from 'theme';

const themeAtom = atom<Theme>({
    key: 'themeAtom',
    default: defaultTheme,
});

export { themeAtom };
