import { DependencyList, useEffect } from 'react';

export const useWindowEvent = <K extends keyof WindowEventMap>(
    type: K,
    listener: (this: Window, ev: WindowEventMap[K]) => void,
    deps: DependencyList,
    options?: boolean | AddEventListenerOptions
) =>
    useEffect(() => {
        if (window) {
            window.addEventListener(type, listener, options);
            return () => {
                window.removeEventListener(type, listener, options);
            };
        }
    }, deps);
