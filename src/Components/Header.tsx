import React, { useEffect, useState } from "react";
import AddListBoard from "./AddListBoard";
import Icon from "./Icon";
import { BsChatFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import UserHeaderProfile from "./UserHeaderProfile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useNavigate } from "react-router-dom";
import { BE_getChats, BE_signOut, getStorageUser } from "../Backend/Queries";
import Spinner from "./Spinner";
import { setUser } from "../Redux/userSlice";
const logo = require("./../Assets/ryo.jpg");

type Props = {};

function Header() {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const goTo = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const hasNewMessage = useSelector(
    (state: RootState) => state.chat.hasNewMessage
  );

  const usr = getStorageUser();
  useEffect(() => {
    if (usr?.id) {
      dispatch(setUser(usr));
    } else {
      goTo("/auth");
    }
  }, [dispatch, goTo]);

  useEffect(() => {
    if (!currentUser?.id) goTo("/auth");
  }, [goTo, currentUser]);

  useEffect(() => {
    const page = getCurrentPage();
    if (page) goTo("/dashboard/" + page);

    const get = async () => {
      if (usr?.id) await BE_getChats(dispatch);
    };

    get();
  }, [goTo]);

  const handleGoToPage = (page: string) => {
    goTo("/dashboard/" + page);
    setCurrentPage(page);
  };

  const handleSignOut = () => {
    BE_signOut(dispatch, goTo, setLogoutLoading);
  };

  const setCurrentPage = (page: string) => {
    localStorage.setItem("emptySpace_page", page);
  };
  const getCurrentPage = () => {
    return localStorage.getItem("emptySpace_page");
  };

  return (
    <div className="flex flex-wrap z-10 sm:flex-row gap-5 items-center justify-between drop-shadow-md bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white">
      <img
        className="w-[50px] drop-shadow-md cursor-pointer"
        src={logo}
        alt="logo"
      />
      <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">
        {getCurrentPage() === "chat" ? (
          <Icon
            IconName={FaList}
            onClick={() => handleGoToPage("")}
            reduceOpacityOnHover={false}
          />
        ) : getCurrentPage() === "profile" ? (
          <>
            <Icon
              IconName={FaList}
              onClick={() => handleGoToPage("")}
              reduceOpacityOnHover={false}
            />
            <Icon
              IconName={BsChatFill}
              ping={hasNewMessage}
              onClick={() => handleGoToPage("chat")}
              reduceOpacityOnHover={false}
            />
          </>
        ) : (
          <>
            <AddListBoard />
            <Icon
              IconName={BsChatFill}
              ping={hasNewMessage}
              onClick={() => handleGoToPage("chat")}
              reduceOpacityOnHover={false}
            />
          </>
        )}
        <div className="group relative">
          <UserHeaderProfile user={currentUser} />
          <div className="absolute pt-5 hidden group-hover:block w-full min-w-max">
            <ul className="w-full bg-white overflow-hidden rounded-md shadow-md text-gray-700 pt-1">
              <p
                onClick={() => handleGoToPage("profile")}
                className="hover:bg-gray-200 py-2 px-4 block cursor-pointer"
              >
                Profile
              </p>
              <button
                onClick={() => !logoutLoading && handleSignOut()}
                className={`hover:bg-gray-200 w-full py-2 px-4 cursor-pointer flex items-center gap-4`}
              >
                Logout
                {logoutLoading && <Spinner />}
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
