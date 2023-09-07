import React, { Children } from "react";

function Drawer({
    className,
    hasBackDrop,
    children,
    show,
    setShow,
}: {
    className?: string;
    hasBackDrop?: boolean;
    children?: React.ReactNode;
    show: boolean;
    setShow?: Function;
}) {
    return (
        <>
            {show && (
                <div
                    className={
                        "Drawer fixed top-0 right-0 h-screen w-screen max-h-[100%] max-w-[100%] box-border z-10 " +
                        className
                    }
                >
                    {hasBackDrop && (
                        <div
                            className=" absolute top-0 left-0 w-full h-full backdrop-blur-[2px] backdrop-brightness-75 -z-10 cursor-pointer"
                            onClick={() => {
                                setShow && setShow(false);
                            }}
                        />
                    )}
                    {children}
                </div>
            )}
        </>
    );
}

export default Drawer;
