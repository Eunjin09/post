import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { auth } from "../shared/firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";

import { loadUserFB } from "../redux/modules/user";

const Header = () => {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.User);

  const user_id = users.list.filter((l, idx) => {
    return l.user_id === auth.currentUser?.email;
  });
  const userNick = user_id[0]?.name;

  const [is_login, setIsLogin] = React.useState(false);

  const loginCheck = async (users) => { if (users) { setIsLogin(true); } else { setIsLogin(false); } };

  React.useEffect(() => { dispatch(loadUserFB()); onAuthStateChanged(auth, loginCheck); }, []);




  return (
    <HeaderWrap>
      <HomeLink to="/">메인으로</HomeLink>
      <div className='userBtn'>
        {is_login ? (
          <>
            <p><span>{userNick}</span>님 환영합니다!</p>
            <button onClick={() => { signOut(auth); alert('로그아웃 되었습니다.') }} >로그아웃</button>
          </>
        ) : (
          <>
            <SignupLink to="/signup">회원가입</SignupLink>
            <LoginLink to="/login" >로그인</LoginLink>
          </>
        )}
      </div>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  overflow: hidden;
  background: #69514B;
  height: 60px;
  color: #fff;
  padding: 0 20px;

  .userBtn {
    float: right;
  }
  p{
    display: inline-block;
    line-height:60px;
  }
  button {
    display: inline-block;
    margin-left : 10px;
    border: 1px solid #fff;
    padding: 8px 50px;
    font-family: 'IM_Hyemin-Regular';
  }
`;

const HomeLink = styled(Link)`
  float: left;
  line-height: 60px;
  color: #fff;
`;

const LoginLink = styled(Link)`
line-height: 60px;
color: #fff;
margin-left : 10px;
border: 1px solid #fff;
padding: 8px 50px;
`;
const SignupLink = styled(Link)`
line-height: 60px;
color: #fff;
border: 1px solid #fff;
padding: 8px 50px;
`;

export default Header;