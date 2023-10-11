import React from 'react'
import { HashRouter, Link,Routes, Route } from 'react-router-dom';
import FlashCard from './PhraseFcMain/FlashCard';
import PhraseFcTop from "./PhraseFcTop/PhraseFcTop";

export const App = () => {
  const onStart = () => {
    console.log('start');
    window.location.href = "#/fc";
  }
  const onCancel = () => {
    console.log('cancel');
    window.location.href = "#/top";
  }

  return (
    <HashRouter>
      <div>
        For Deubg<br/>
        <Link to="/">Top</Link>&nbsp;
        <Link to="fc">Main</Link>
      </div>
      <Routes>
        <Route path="fc" element={<FlashCard onCancel={onCancel}/>} />
        <Route path="*" element={<PhraseFcTop onStart={onStart}/>} />
      </Routes>
    </HashRouter>
  );
}
