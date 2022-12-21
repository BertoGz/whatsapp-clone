import { useEffect, useRef } from "react";
import { useQueryFirebaseUserData } from "../ReactQuery";
import { setIsLoggedOn } from "../Redux/AppState";
import { resetState as resetQbState } from "../Redux/Quickblox";
import { resetState as resetAppState } from "../Redux/Quickblox";
import { useAppDispatch } from "../Redux/useAppDispatch";
import { useAppSelector } from "../Redux/useAppSelector";
// Hook
function usePrevious(value: any) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
export const useLoggoutEffect = () => {
  const { data: userData } = useQueryFirebaseUserData();
  const dispatch = useAppDispatch();
  const prevUserData = usePrevious(userData);
  const isLoggedOn = useAppSelector((state) => state.AppState.isLoggedOn);

  useEffect(() => {
    if (prevUserData !== userData && !userData) {
      // clear quickblox
      dispatch(setIsLoggedOn(false));
      return;
    }
    if (userData) {
      dispatch(setIsLoggedOn(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    if (!isLoggedOn) {
      dispatch(resetAppState());
      dispatch(resetQbState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedOn]);

  return <></>;
};
