import {useCallback, useRef} from 'react';
export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timer = useRef<ReturnType<typeof setTimeout>>();

    const debouncedCallback = useCallback((...args) => {
        if(timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
    return debouncedCallback;
}
