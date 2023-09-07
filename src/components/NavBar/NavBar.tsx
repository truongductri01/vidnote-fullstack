import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setLoader } from "../../redux/reducers/loader/loaderReducer";
import { useDispatch } from "react-redux";
import { secondaryButtonStyleClassName } from "../../styles/buttonStyles";
import { logOutAndClearData } from "../../helpers/logout";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";

function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authInfo = useAppSelector((state) => state.auth);
    const linkClass = "mr-5 border-b-2 py-1 px-1";
    const [idToken, setIdToken] = useState<string>();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openSetting, setOpenSetting] = useState<boolean>(false);

    useEffect(() => {
        if (authInfo.isSignIn) {
            setIdToken(authInfo.accessToken);
        }
    }, [authInfo.isSignIn, authInfo.accessToken]);
    return (
        <div className="NavBar relative flex-shrink-0 w-full h-12 px-5 box-border flex items-center bg-primary text-gray-50 text-lg leading-6 md:h-14">
            <div className="flex w-full justify-between items-center">
                <i
                    className="fa fa-bars fa-lg cursor-pointer"
                    aria-hidden="true"
                    onClick={() => setOpenMenu(!openMenu)}
                ></i>
                <p>Home Page</p>
                <i
                    className="fa fa-cog fa-lg cursor-pointer"
                    aria-hidden="true"
                    onClick={() => setOpenSetting(!openSetting)}
                ></i>
            </div>
            {openMenu && (
                <div className="w-full h-full fixed top-0 left-0 z-10 ">
                    <div
                        className="w-full h-full absolute top-0 left-0 backdrop-blur-[1px]"
                        onClick={() => setOpenMenu(false)}
                    ></div>
                    <div className="w-full absolute left-0 top-12 border-t-8 border-t-white bg-primary z-10 px-5 py-5">
                        <Link
                            to={"/"}
                            className="flex items-center"
                            onClick={() => setOpenMenu(false)}
                        >
                            <i
                                className="fa fa-home fa-lg"
                                aria-hidden="true"
                            ></i>
                            <p className="ml-3">Home</p>
                        </Link>
                        {/* <Link
                            to={"/"}
                            className="flex items-center"
                            onClick={() => setOpenMenu(false)}
                        >
                            <i
                                className="fa fa-info-circle fa-lg"
                                aria-hidden="true"
                            ></i>
                            <p className="ml-3">About</p>
                        </Link> */}
                    </div>
                </div>
            )}
            {openSetting && (
                <div className="w-full h-full fixed top-0 left-0 z-10 ">
                    <div
                        className="w-full h-full absolute top-0 left-0 backdrop-blur-[1px]"
                        onClick={() => setOpenSetting(false)}
                    ></div>
                    <div className="w-full absolute left-0 top-12 border-t-8 border-t-white bg-primary z-10 px-5 py-5 ">
                        <Link
                            to={"/my-profile"}
                            className="flex items-center mb-5"
                            onClick={() => setOpenSetting(false)}
                        >
                            <i
                                className="fa fa-user fa-lg"
                                aria-hidden="true"
                            ></i>
                            <p className="ml-3">My Profile</p>
                        </Link>
                        <Link
                            to={"/notes"}
                            className="flex items-center"
                            onClick={() => {
                                setOpenSetting(false);
                                dispatch(setLoader(true));
                                logOutAndClearData(dispatch).then(() => {
                                    dispatch(setLoader(false));
                                    navigate("/auth/login");
                                });
                            }}
                        >
                            <i
                                className="fa fa-sign-out fa-lg"
                                aria-hidden="true"
                            ></i>
                            <p className="ml-3">Sign Out</p>
                        </Link>
                    </div>
                </div>
            )}
            <div className="hidden ">
                <Link to={"/"} className={linkClass}>
                    <p>Home</p>
                </Link>
                <Link to={"/notes"} className={linkClass}>
                    <p>Notes</p>
                </Link>
                <Link to={"/my-profile"} className={linkClass}>
                    <p>My Profile</p>
                </Link>
                {idToken ? (
                    <button
                        className={
                            secondaryButtonStyleClassName.small + " ml-auto"
                        }
                        onClick={() => {
                            dispatch(setLoader(true));
                            logOutAndClearData(dispatch).then(() => {
                                dispatch(setLoader(false));
                                navigate("/auth/login");
                            });
                        }}
                    >
                        Sign out
                    </button>
                ) : (
                    <button
                        className={
                            secondaryButtonStyleClassName.small + " ml-auto"
                        }
                        onClick={() => {
                            navigate("/auth/login");
                        }}
                    >
                        Sign in
                    </button>
                )}
            </div>
        </div>
    );
}

export default NavBar;
