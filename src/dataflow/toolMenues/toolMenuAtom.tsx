import React from 'react';
import { atom } from 'recoil';

export const toolMenuAtom = atom<React.ReactNode>({
    key: 'toolMenuAtom',
    default: <></>,
});
