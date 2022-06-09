import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./shared/firebase";


// 스타일
import styled from "styled-components";
import './App.css';

// 페이지
// import data from './data.js'; 데이터 페이지 수정 후 링크변경하고 sueState변경
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import Write from './components/Write';
import Post from './components/Post';
import Edit from './components/Edit';
import NotFound from './components/NotFound';

function App() {

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);

  // 로그인 상태 확인
  const [is_login, setIsLogin] = React.useState(false);

  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };


  return (
    <div className="App">
      <BrowserRouter>
        <Wrap>
          <Header />
          <Routes>
            <Route path="/signup" element={<Signup />}></Route>

            {is_login ? (
              <>
                <Route path="/" element={<Main />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/write" element={<Write />}></Route>
                <Route path="/post/:id" element={<Post />}></Route>
                <Route path="/edit/:id" element={<Edit />}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </>
            ) : (
              <>
                <Route path="/" element={<Login />}></Route>
                <Route path="/login" element={<Login />}></Route>
              </>
            )}

          </Routes>
        </Wrap>
      </BrowserRouter>
    </div>
  );
}


const Wrap = styled.div`
  padding: 0 200px;
`;

export default App;
