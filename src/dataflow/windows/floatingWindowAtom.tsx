import React from 'react';
import { atom } from 'recoil';

export type FloatingWindowPrefs = {
    contents: React.ReactNode;
    onClose: () => unknown;
    title: string;
    show: boolean;
};

export const floatingWindowAtom = atom<FloatingWindowPrefs>({
    key: 'WindowAtom',
    default: {
        contents: <></>,
        onClose: () => {},
        title: '',
        show: false,
    },
});
