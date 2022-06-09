import { db } from "../../shared/firebase";
import { getDocs, collection } from "firebase/firestore";

// 액션 타입
const LOAD = "user/LOAD";

const initialState = {
  list: []
}

// 액션 생성 함수
export function loadUsers(user_list) {
  return { type: LOAD, user_list };
}

// 미들웨어
export const loadUserFB = () => {
  return async function (dispatch) {
    const dic_data = await getDocs(collection(db, "users"));
    let list = [];
    dic_data.forEach((doc) => { list.push({ id: doc.id, ...doc.data() }); });
    dispatch(loadUsers(list));
  };
};

// 리듀서
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    // 불러오기
    case "user/LOAD": {
      return { list: action.user_list };
    }

    default:
      return state;
  }
}