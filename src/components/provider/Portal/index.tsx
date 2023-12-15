import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { portalAtom } from 'dataflow/portals/portalAtom';

export const PortalProvider = ({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) => {
    const setPortal = useSetRecoilState(portalAtom);
    const portalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setPortal(portalRef.current);
    }, []);

    return (
        <>
            {children}
            <div ref={portalRef} className={className}></div>
        </>
    );
};
