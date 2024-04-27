import { useCallback } from 'react';
import { POST_MESSAGE } from '../constants/message';
import useWindowPostMessage from './useWindowPostMessage';
import AppStore from '../stores/AppStore';

function useLogoutListener(store: AppStore) {
  const logoutListener = useCallback(
    (event: MessageEvent) => {
      if (event?.data?.type === POST_MESSAGE.LOGOUT) {
        store.user.logout();
      }
    },
    [store.user],
  );

  useWindowPostMessage(logoutListener);
}

export default useLogoutListener;
