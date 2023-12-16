import React from 'react';
import { atom } from 'recoil';

export type FloatingWindowPrefs = {
    contents: React.ReactNode;
    title: string;
    show: boolean;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
};

export const floatingWindowAtom = atom<FloatingWindowPrefs>({
    key: 'WindowAtom',
    default: {
        contents: <></>,
        title: '',
        show: false,
    },
});
