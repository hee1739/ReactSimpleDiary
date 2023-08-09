import React, { useContext, useEffect, useRef, useState } from "react";
import { DiartDispatchContext } from "./App";

const DiaryEditor = () => {
  const { onCreate } = useContext(DiartDispatchContext); //비구조화 할당으로 받아야함

  const authorInput = useRef();
  const cotentInput = useRef();
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });
  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  //일기 저장이 일어났을때 작용하는 함수
  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus(); //현재 가르키는 값을 포커스
      return;
    }
    if (state.content.length < 5) {
      cotentInput.current.focus();
      return;
    }
    onCreate(state.author, state.content, state.emotion);
    alert("저장 완료");
    //저장 완료후 setState에 설정한 기본 값으로 초기화
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={cotentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <span>오늘의 감정점수 : </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);
