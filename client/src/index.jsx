import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
// import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
// const element = (
//   <BrowserRouter>
//     <Routes>
//       <Route path="/:productId" element={<App />}>
//       </Route>
//     </Routes>
//   </BrowserRouter>
// );
root.render(<App />);
