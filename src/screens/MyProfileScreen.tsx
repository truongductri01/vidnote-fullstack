import React from "react";
import { useAppSelector } from "../redux/hooks";

function MyProfileScreen() {
    const userInfo = useAppSelector((state) => state.user.userInfo);
    return (
        <div className="MyProfile p-2 w-full flex-grow box-border flex flex-col overflow-y-auto items-center justify-center">
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
                        <p>{userInfo.id}</p>
                    </div>
                </div>
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
