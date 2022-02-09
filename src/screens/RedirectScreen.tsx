import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { setRedirect } from "../redux/reducers/redirect/redirectReducer";

function RedirectScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [appHeight, setAppHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setAppHeight(window.innerHeight);
    });
    window.addEventListener("orientationchange", () => {
      setAppHeight(window.innerHeight);
    });
  }, []);

  useEffect(() => {
    if (searchParams.get("type") === "note" && searchParams.get("videoId")) {
      dispatch(
        setRedirect({
          type: searchParams.get("type"),
          videoId: searchParams.get("videoId"),
        })
      );
      navigate("/");
    }
  }, [searchParams]);
  return (
    <div
      className="RedirectScreen w-sreen max-w-full box-border flex items-center justify-center px-10 overflow-auto"
      style={{ height: appHeight + "px" }}
    >
      {!(
        searchParams.get("type") === "note" && searchParams.get("videoId")
      ) && <p className="text-red-400 text-5xl">Invalid redirect route</p>}
    </div>
  );
}

export default RedirectScreen;
