import React from 'react';
import { useRecoilValue } from 'recoil';
import FloatingWindow from 'components/molecules/FloatingWindow';
import { floatingWindowAtom } from 'dataflow/windows/floatingWindowAtom';

export const FloatingWindowProvider = ({ children }: { children?: React.ReactNode }) => {
    const windowPrefs = useRecoilValue(floatingWindowAtom);

    return (
        <>
            <FloatingWindow
                show={windowPrefs.show}
                title={windowPrefs.title}
                css={{
                    zIndex: 1000,
                }}
                initialLoc={[100, 100]}
                onClose={windowPrefs.onClose}
            >
                {windowPrefs.contents}
            </FloatingWindow>
            {children}
        </>
    );
};
