import { useEffect } from 'react';

function useWindowPostMessage(callback: (event: MessageEvent) => void) {
  useEffect(() => {
    if (callback) window.addEventListener('message', callback);

    return () => {
      if (callback) window.removeEventListener('message', callback);
    };
  }, [callback]);
}

export default useWindowPostMessage;
