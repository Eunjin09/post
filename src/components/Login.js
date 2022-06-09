import React from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../shared/firebase";


const Login = () => {
  const navigate = useNavigate();


  const [is_login, setIsLogin] = React.useState(false);
  // user정보가 있다면 true, 없다면 flase반환
  const loginCheck = async (users) => { if (users) { setIsLogin(true); } else { setIsLogin(false); } };
  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck); //렌더링시 로그인 체크!
  }, []);
  console.log(is_login)

  // 아이디 & 패스워드
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);


  const loginFB = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, id_ref.current.value, pw_ref.current.value)
      navigate('/');
    } catch (error) {
      alert('이메일 또는 비밀번호가 일치하지 않습니다')
      navigate('/login');
    } finally {
      id_ref.current.value = '';
      pw_ref.current.value = '';
    }
  }



  return (
    <React.Fragment>
      <Title>로그인</Title>
      <Form>
        <label htmlFor="user_id">
          <p>아이디</p>
          <input type="text" id="user_id" placeholder="아이디를 입력해주세요" ref={id_ref} />
        </label>
        <label htmlFor="user_pw">
          <p>비밀번호</p>
          <input type="password" id="user_pw" placeholder="비밀번호를 입력해주세요" ref={pw_ref} />
        </label>
      </Form>
      <InputBtn
        onClick={loginFB}
      >로그인하기</InputBtn>
    </React.Fragment>
  );
};

const Title = styled.h1`
 text-align: left;
 font-size: 30px;
 margin: 30px 0;
 `;

const Form = styled.form`
  
label{
  display: block;
  text-align: left;
}
input {
  outline: none;
  width:100%;
  background: rgba(255,255,255,1);
  border: none;
  padding: 10px 3px;
  font-size: 16px;
  margin-top: 10px;
}
`;

const InputBtn = styled.button`
  font-family: 'IM_Hyemin-Regular';
  display: inline-block;
  width: 100%;
  padding: 10px 0;
  background: #5563a1;
  border: none;
  color:#fff;
  font-size: 18px;
  cursor: pointer;
`;

export default Login;