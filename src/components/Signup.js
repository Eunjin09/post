import React from 'react';
import styled from "styled-components";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import { auth, db } from "../shared/firebase";
import { collection, addDoc } from "firebase/firestore";

const Signup = () => {
  const id_ref = React.useRef(null);
  const nick_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  const signupFB = async () => {
    // 파이어베이스 auth에 저장
    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    )

    // 파이어베이스 db에 저장
    const user_doc = await addDoc(collection(db, 'users'), {
      user_id: user.user.email,
      name: nick_ref.current.value,
      user_pw: pw_ref.current.value,
    });
  };

  return (
    <>
      <Title>회원가입</Title>
      <Form>
        <label htmlFor="user_id">
          <p>아이디</p>
          <input type="text" id="user_id" placeholder="아이디를 입력해주세요" ref={id_ref} />
        </label>
        <label htmlFor="user_nick">
          <p>닉네임</p>
          <input type="text" id="user_nick" placeholder="닉네임을 입력해주세요" ref={nick_ref} />
        </label>
        <label htmlFor="user_pw">
          <p>비밀번호</p>
          <input type="password" id="user_pw" placeholder="비밀번호를 입력해주세요" ref={pw_ref} />
        </label>
      </Form>
      <InputBtn
        onClick={signupFB}
        to='/'
      >회원가입하기</InputBtn>
    </>
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

const InputBtn = styled(Link)`
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

export default Signup;