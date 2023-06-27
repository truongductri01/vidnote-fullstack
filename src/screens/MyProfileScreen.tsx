import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import DocumentDuplicate from "../designComponents/Icons/DocumentDuplicate";
import Toast from "../designComponents/Toast/Toast";
import {
    primaryButtonStyleClassName,
    secondaryButtonStyleClassName,
} from "../styles/buttonStyles";

function MyProfileScreen() {
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const userInfo = useAppSelector((state) => state.user.userInfo);

    useEffect(() => {
        if (isCopied) {
            setTimeout(() => setIsCopied(false), 2000);
        }
    }, [isCopied]);

    return (
        <div className="MyProfile p-2 w-full flex-grow box-border flex flex-col overflow-y-auto items-center justify-center">
            {isCopied && (
                <Toast message="Your id is copied into clipboard" type="info" />
            )}
            <div className="MyProfile__Card w-full h-[200px] px-[3rem] flex flex-col items-center justify-center md:flex-row">
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
                            <p>{userInfo.id}</p>
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
                {userInfo.searchable && (
                    <button className={secondaryButtonStyleClassName.default}>
                        Make your profile private
                    </button>
                )}
                {!userInfo.searchable && (
                    <button className={primaryButtonStyleClassName.default}>
                        Make your profile public
                    </button>
                )}
            </div>
        </div>
    );
}

const PlaceHolderAvatar = ({ firstName }: { firstName: string }) => {
    return (
        <div className="PlaceHolderAvatar h-[60px] w-[60px] rounded-full flex items-center justify-center mb-[2rem] bg-gray-300 md:mr-[2rem] md:mb-0">
            <p className="text-center text-2xl">
                {firstName.at(0)?.toUpperCase()}
            </p>
        </div>
    );
};

export default MyProfileScreen;
