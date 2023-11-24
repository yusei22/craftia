import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import FloatingWindow from 'components/molecules/FloatingWindow';
import { floatingWindowAtom } from 'dataflow/windows/floatingWindowAtom';

export const FloatingWindowProvider = ({ children }: { children?: React.ReactNode }) => {
    const windowPrefs = useRecoilValue(floatingWindowAtom);

    useEffect(() => {
        windowPrefs.onClose();
    }, [windowPrefs.contents]);

    return (
        <>
            <FloatingWindow
                onClose={windowPrefs.onClose}
                show={windowPrefs.show}
                title={windowPrefs.title}
                css={{
                    zIndex: 1000,
                }}
                initialLoc={[100, 100]}
            >
                {windowPrefs.contents}
            </FloatingWindow>
            {children};
        </>
    );
};
