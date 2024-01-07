import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/layout.tsx';
import '@/index.css';
import Home from '@/pages/home.page';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
        </Routes>
      </BrowserRouter>
    </Layout>
  </React.StrictMode>,
);
