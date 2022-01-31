import React, { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { resetToast } from "../../redux/reducers/toast/toastReducer";

const toastStyles = {
  success: {
    main: "border-green-500",
    signal: "bg-green-500",
  },
  info: {
    main: "border-blue-500",
    signal: "bg-blue-500",
  },
  warning: {
    main: "border-yellow-500",
    signal: "bg-yellow-500",
  },
  error: {
    main: "border-red-500",
    signal: "bg-red-500",
  },
};

function Toast({
  message,
  type,
}: {
  message: string;
  type: "success" | "info" | "warning" | "error";
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetToast());
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={
        "Toast w-3/5 h-20 rounded-md border-2 bg-gray-100 absolute top-2 right-2 flex flex-col justify-center py-1 px-2 z-50 " +
        toastStyles[type].main
      }
    >
      <div className="Signal h-6 flex-shrink-0 flex items-center border-b-2 border-gray-500">
        <div
          className={"w-4 h-4 rounded-md mr-2 " + toastStyles[type].signal}
        ></div>
        {type.charAt(0).toUpperCase() + type.substring(1)}
      </div>
      <div className="Content flex-grow">{message}</div>
    </div>
  );
}

export default Toast;
