import React from 'react';
import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import Home from './pages/Home';
import AppRoutes from './routes/AppRoutes';
import { ConfigProvider } from 'antd/';
import heIL from 'antd/locale/he_IL';

const queryClient = new QueryClient();

function App() {
  return (
    <ConfigProvider direction="rtl" locale={heIL}>

  <QueryClientProvider client={queryClient}>
<AppRoutes/>
    </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
