import React, { useState } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth, storage } from "../shared/firebase";

import { loadUserFB } from "../redux/modules/user";
import { updatePostFB } from '../redux/modules/mgz'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';




const Edit = () => {

  React.useEffect(() => { dispatch(loadUserFB()); onAuthStateChanged(auth, loginCheck); }, []);

  const params = useParams();
  const dispatch = useDispatch();

  let mgz_lists = useSelector((state) => state.Mgz.list);

  // 리스트id와 클릭한 id 
  const post = mgz_lists.filter((l, idx) => {
    return l.id === params.id;
  });
  const post_list = post[0];



  // 로그인 확인
  const [is_login, setIsLogin] = React.useState(false);

  // 닉네임
  const users = useSelector((state) => state.User);
  const user_id = users.list.filter((l, idx) => {
    return l.user_id === auth.currentUser.email;
  });
  const userNick = user_id[0]?.name;

  const loginCheck = async (users) => { if (users) { setIsLogin(true); } else { setIsLogin(false); } };



  // 선택한 레이아웃
  const [layout, setLayout] = useState(null);
  // 글 내용
  const [input, setInput] = useState(post_list.text);
  // 기본 이미지
  const [files, setFiles] = useState(post_list.img);


  const is_checked = (e) => {
    if (e.target.checked) {
      setLayout(e.target.value);
      // console.log(layout)
    }
  };


  // 이미지 업로드
  const file_link_ref = React.useRef(files);

  const uploadFB = async (e) => {
    const upload_file = e.target.files[0];
    const uploaded_file = await uploadBytes(ref(storage, `images/${upload_file.name}`),
      upload_file
    );

    const file_url = await getDownloadURL(uploaded_file.ref);
    console.log(file_url) //이미지 url
    file_link_ref.current = { url: file_url };
    setFiles(file_link_ref.current?.url);
  }

  const editPost = () => {
    const postTime = () => {
      let today = new Date();
      let time = {
        year: today.getFullYear(),
        month: (today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1),
        date: today.getDate() > 9 ? today.getDate() : '0' + today.getDate(),
        hours: today.getHours() > 9 ? today.getHours() : '0' + today.getHours(),
        minutes: today.getMinutes() > 9 ? today.getMinutes() : '0' + today.getMinutes(),
        seconds: today.getSeconds() > 9 ? today.getSeconds() : '0' + today.getSeconds(),
      }
      let timeString = `${time.year}-${time.month}-${time.date} ${time.hours}:${time.minutes}:${time.seconds}`
      return timeString;
    }

    dispatch(updatePostFB({ id: post_list.id }, { text: input, layout: layout, img: files, day: postTime(), nick_name: userNick }))
  }



  return (
    <>
      <Title>게시글 수정</Title>
      <Form>
        <label htmlFor='file_img'>
          <input type="file" id="file_img" name='file' onChange={uploadFB} accept="image/png, image/jpeg" />
        </label>
        <h2>레이아웃 고르기</h2>
        <ul>
          <li>
            <input type="radio" name="layout" id="right_img" value="right" onChange={is_checked} />
            <label>오른쪽에 이미지 왼쪽에 텍스트</label>
            <div className='right_img'>
              <p>{input}</p>
              <div><img src={files} alt="업로드이미지"></img></div>
            </div>
          </li>
          <li>
            <input type="radio" name="layout" id="right_img" value="left" onChange={is_checked} />
            <label>왼쪽에 이미지 오른쪽에 텍스트</label>
            <div className='left_img'>
              <div><img src={files} alt="업로드이미지"></img></div>
              <p>{input}</p>
            </div>
          </li>
          <li>
            <input type="radio" name="layout" id="right_img" value="bottom" onChange={is_checked} />
            <label>하단에 이미지 상단에 텍스트</label>
            <div className='btm_img'>
              <p>{input}</p>
              <div><img src={files} alt="업로드이미지"></img></div>
            </div>
          </li>
        </ul>

        <label htmlFor="user_text">
          <p>게시물 내용</p>
          <textarea id="user_text" defaultValue={post_list.text} onChange={(e) => {
            setInput(e.target.value);
          }} />
        </label>
      </Form>
      <AddBtn
        onClick={editPost}
        to='/'
      >게시글 수정</AddBtn>
    </>
  );
};

const Title = styled.h1`
 text-align: left;
 font-size: 30px;
 margin: 30px 0;
 `;

const Form = styled.form`
margin: 0 auto;
text-align: left;

h2 {
  margin: 40px 0 20px;
  font-size: 22px;
}

li>div{
  /* overflow: hidden; */
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 30px;
  text-align: center;
}
li:last-child>div{
  display: block;
}
li img{
  width: 100%;
  object-fit: cover;
}

//right_img
p {
  flex: 3;
  background: green;
  word-break: break-all;
  /* width: 200px;
  display: inline-block; */
}
.right_img div {
  flex: 2;
  background: gray;
}

//left_img
.left_img div {
  flex: 2;
  background: gray;
}

//btm_img
.btm_img p {
  background: green;
}
.btm_img div {
  background: gray;
}

textarea{
  width: 100%;
  height: 100px;
}

`;

const AddBtn = styled(Link)`
  display: block;
  font-family: 'IM_Hyemin-Regular';
  background: #5563a1;
  width: 100%;
  border: none;
  color:#fff;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 30px;
`;

export default Edit;