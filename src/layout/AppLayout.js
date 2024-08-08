import React, { useEffect } from "react";
import { useLocation } from "react-router";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import CustomContainer from "../component/CustomContainer";
import ToastMessage from "../component/ToastMessage";
import ChatBtn from "../component/ChatBtn";
import userStore from "../store/userStore";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const { user, loginWithToken } = userStore();
  console.log('user :', user)
  
// 토큰이 있다면 로그인 상태로 넘겨주기
  useEffect(() => {
    loginWithToken();
  }, []);

  return (
    <div>
      <ToastMessage />
      { !location.pathname.includes("/me/") && location.pathname.includes("admin") ? (
        <div className="admin-page">
          <div className="sidebar mobile-sidebar">
            <Sidebar />
          </div>
          <div className="contents">
            {children}
          </div>
        </div>
      ) : (
        <>
          {user && <ChatBtn/>}
          <Navbar user={user} />
          <CustomContainer children={children}></CustomContainer>
        </>
      )}
    </div>
  );
};

export default AppLayout;
