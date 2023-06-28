import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import DocumentDuplicate from "../designComponents/Icons/DocumentDuplicate";
import Toast from "../designComponents/Toast/Toast";
import {
    primaryButtonStyleClassName,
    secondaryButtonStyleClassName,
} from "../styles/buttonStyles";
import { CHANGE_USER_SEARCHABLE } from "../graphql/mutations/userMutations";
import { useMutation, useLazyQuery } from "@apollo/client";
import { setLoader } from "../redux/reducers/loader/loaderReducer";
import Loader from "../designComponents/Loader/Loader";
import { setUserInfo } from "../redux/reducers/user/userReducer";
import { primaryInputStyleClassName } from "../styles/inputStyles";
import { GET_USER_BY_ID } from "../graphql/queries/searchUsersById";

function MyProfileScreen() {
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const userInfo = useAppSelector((state) => state.user.userInfo);
    const isLoading = useAppSelector((state) => state.loader.isLoading);
    const [changeSearchable, { loading }] = useMutation(
        CHANGE_USER_SEARCHABLE(userInfo.id)
    );
    const dispatch = useAppDispatch();
    const [userIdSearch, setUserIdSearch] = useState<string>("");
    const [
        searchUsersById,
        {
            data: searchUserData,
            loading: searchUserLoading,
            error: searchUserError,
        },
    ] = useLazyQuery<string>(GET_USER_BY_ID);

    useEffect(() => {
        if (isCopied) {
            setTimeout(() => setIsCopied(false), 2000);
        }
    }, [isCopied]);

    useEffect(() => {
        dispatch(setLoader(loading));
    }, [loading]);

    const handleSearch = () => {
        console.log("Calling on search");
        searchUsersById({
            variables: {
                id: userIdSearch,
            },
        });
    };

    return (
        <div className="MyProfile w-full flex-grow box-border flex flex-col overflow-y-auto items-center sm:flex-row">
            {isLoading && <Loader />}
            {isCopied && (
                <Toast message="Your id is copied into clipboard" type="info" />
            )}
            {/* Your profiles start */}
            <div className="MyProfile__Card h-max w-full sm:h-full sm:w-max lg:w-1/2">
                <div className="w-full h-[200px] px-[3rem] flex flex-col items-center justify-center">
                    <PlaceHolderAvatar firstName={userInfo.firstName} />
                    <div className=" flex">
                        <div className="mr-[2rem]">
                            <p>Name:</p>
                            <p>Username:</p>
                            <p>Id: </p>
                        </div>
                        <div>
                            <p>
                                {userInfo.firstName} {userInfo.lastName}
                            </p>
                            <p>{userInfo.username}</p>
                            <div className="flex items-center">
                                <p>{userInfo.id.substring(0, 6)}...</p>
                                <div className="flex flex-col items-center">
                                    <DocumentDuplicate
                                        className="cursor-pointer mx-2 hover:bg-violet-200 transition-all duration-100 p-[2px] rounded-sm hover:scale-110"
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                userInfo.id
                                            );
                                            setIsCopied(true);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full px-[3rem] flex items-center justify-center">
                    <button
                        className={
                            userInfo.searchable
                                ? secondaryButtonStyleClassName.default
                                : primaryButtonStyleClassName.default
                        }
                        onClick={() =>
                            changeSearchable().then(() => {
                                // update user searchable
                                dispatch(
                                    setUserInfo({
                                        ...userInfo,
                                        searchable: !userInfo.searchable,
                                    })
                                );
                            })
                        }
                    >
                        {userInfo.searchable
                            ? "Make profile private"
                            : "Make profile public"}
                    </button>
                </div>
            </div>
            {/* Your profiles end */}

            {/* Searching Start */}
            <div className="grow pt-10 w-full px-5 sm:h-full">
                <form
                    className="VideoSearch__form w-full bg-gray-50 h-[40px] flex-shrink-0 flex"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                >
                    <input
                        type="text"
                        className={primaryInputStyleClassName}
                        value={userIdSearch}
                        onChange={(e) => setUserIdSearch(e.target.value)}
                        placeholder="Search for a friend ..."
                    />
                    <button
                        className={
                            primaryButtonStyleClassName.default + " ml-2"
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            handleSearch();
                        }}
                    >
                        Submit
                    </button>
                </form>

                {searchUserData && <RenderSearchUser data={searchUserData} />}
            </div>
            {/* Searching End */}
        </div>
    );
}

const PlaceHolderAvatar = ({
    firstName,
    className,
}: {
    firstName: string;
    className?: string;
}) => {
    return (
        <div
            className={`PlaceHolderAvatar h-[60px] w-[60px] rounded-full flex items-center justify-center mb-[2rem] bg-gray-300 ${className}`}
        >
            <p className="text-center text-2xl">
                {firstName.at(0)?.toUpperCase()}
            </p>
        </div>
    );
};

const RenderSearchUser = ({ data }: { data: string }) => {
    const { getUserById }: any = data;
    const user: {
        id: string;
        firstName: string;
        lastName: string;
        username: string;
    } = getUserById.user as any;

    return (
        <div className=" flex flex-row items-center my-5 py-5 justify-center border-2 border-solid border-black rounded-lg hover:bg-slate-200 cursor-pointer">
            <div className="flex items-center">
                <PlaceHolderAvatar
                    firstName={user.firstName}
                    className="h-[40px] w-[40px] mb-0 mr-10"
                />
            </div>
            <div>
                <p>
                    {user.firstName} {user.lastName}
                </p>
                <p>{user.username}</p>
            </div>
        </div>
    );
};

export default MyProfileScreen;
