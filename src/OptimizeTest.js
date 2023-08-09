import React, { useEffect, useState } from "react";

// const TextView = React.memo(({ text }) => {
//   useEffect(() => {
//     console.log(`update :: Text : ${text}`);
//   });
//   return <div>{text}</div>;
// });
// const CountView = React.memo(({ count }) => {
//   useEffect(() => {
//     console.log(`update :: count : ${count}`);
//   });
//   return <div>{count}</div>;
// });
const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA Update - count: ${count}`);
  });
  return <div>{count}</div>;
});
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`CounterB Update - count : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};
const areEqual = (prevProps, nextProps) => {
  if (prevProps.obj.count === nextProps.obj.count) {
    return true;
  }
  return false;
  //return true; // 이전 프롭스와 현재 프롭스가 같다 -> 리렌더링을 일으키지 않게 된다
  // return false; 이전 프롭스와 현재 프롭스가 다르다 -> 리렌더링 된다
};

const MemoizedCunterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  //   const [count, setCount] = useState(1);
  //   const [text, setText] = useState("");

  //   return (
  //     <div style={{ padding: 50 }}>
  //       <div>
  //         <h2>count</h2>
  //         <CountView count={count} />
  //         <button onClick={() => setCount(count + 1)}>+</button>
  //       </div>
  //       <div>
  //         <h2>text</h2>
  //         <TextView text={text} />
  //         <input value={text} onChange={(e) => setText(e.target.value)} />
  //       </div>
  //     </div>
  //   );
  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCunterB obj={obj} />
      </div>
      <button onClick={() => setObj({ count: obj.count })}>B Button</button>
    </div>
  );
};

export default OptimizeTest;
