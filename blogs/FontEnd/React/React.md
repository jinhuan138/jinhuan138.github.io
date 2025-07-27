## JSX

+ 列表循环

  ```react
  import { useState } from "react";
  function List() {
      const [list] = useState([
          "零化域的缺失之环",
          "闭时曲线的碑文",
          "对偶福音的规约",
          "模糊像散的孤独",
          "二律背反的双重人格",
          "永劫回归的潘多拉",
          "回折叙唱的鹅妈妈",
          "盟誓的文艺复兴",
      ]);
      return (
          <ul>
              {list.map((i, index) => 
                        <li key={index}>{i}</li>
                       )}
          </ul>
      );
  }
  export default List;
  ```

+ 传递属性

  ```react
  function Son(props){
        return <>{props.msg}</>
  }
  
  function Father() {
  	return  <Son msg='hello'/>
  }
  
  export default Father;
  ```

+ 事件

  ```react
  import { useState } from "react";
  function Button() {
      const [count, setCount] = useState(0);
      //使用useState Hook
      //count用于保存渲染间的数据。
      //setCount函数 更新变量并触发 React 再次渲染组件。
      return (
          <button
              onClick={() => {
                  setCount(count + 1);
              }}
              >
              {count}
          </button>
      );
  }
  
  export default Button;
  ```
  
+ dangerouslySetInnerHTML

  ```jsx
  export default function App() {
      //与v-html类似
      const html = "<input/ placeholder='这是一个输入框'>"
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
  ```

## Hook

+ useRef

  ```jsx
  //使用 ref 引用值
  import { useRef } from "react";
  
  export default function App() {
      let ref = useRef(0);
      //useRef 返回一个这样的对象{
      // current: 0 // 你向 useRef 传入的值
      //}
      function handleClick() {
          //组件不会在每次递增时重新渲染
          ref.current = ref.current + 1;
          console.log(ref.current)
      }
      return <button onClick={handleClick}>button</button>;
  }
  ```

  ```jsx
  //使用 ref 操作 DOM
  import { useRef } from "react";
  
  export default function App() {
  	const inputRef = useRef(null);
  	function handleClick() {
  		inputRef.current.focus();
  	}
  
  	return (
  		<>
  			<input ref={inputRef} />
  			<button onClick={handleClick}>focus</button>
  		</>
  	);
  }
  ```

+ useEffect

  ```jsx
  import { useRef, useEffect } from "react";
  
  export default function App() {
  	const div = useRef(null);
  	useEffect(() => {
  		console.log(div.current);
  	}, []);
  	return <div ref={div}>demo</div>;
  }
  ```

+ useContext

  ```jsx
  import { createContext, useState,useContext } from "react";
  const Context = createContext(null);////1. 创建 Context
  const Son=()=> {
      //子组件为文件时Context单独为文件导出
      const count = useContext(Context);
      return <>{count}</>;
  }
  
  export default function App() {
  
      const [count, setCount] = useState(0);
      //2. 使用 Context Provider
      return (
          <Context.Provider value={count}>
              <button onClick={() => setCount(count + 1)}>count</button>
              <Son/>
          </Context.Provider>
      );
  }
  ```

+ useMemo

  ```jsx
  import { useState, useMemo } from "react";
  
  export default function App() {
      const [count, setCount] = useState(0);
      //当数组中的依赖项发生变化时，才会重新计算函数的返回值。
      const computedCount = useMemo(() => count * 2, [count]);
      return <button onClick={() => setCount(count + 1)}>{computedCount}</button>;
  }
  ```

+ useCallback

  ```jsx
  import { useState, useCallback } from "react";
  
  export default function App() {
  	const [count, setCount] = useState(0);
       //用于在函数组件中缓存回调函数，以避免在每次渲染时重新创建新的回调函数。
       //它接收一个回调函数和依赖数组，并返回一个记忆化后的回调函数。
  	const increment = useCallback(() => {
  		setCount(count + 1);
  	}, [count]);
  	return <button onClick={increment}>{count}</button>;
  }
  ```

  