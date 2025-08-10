import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';

export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/1', element: <div>לוח שנה</div> },
      { path: '/2', element: <div>תכני קורס</div> },
    ],
  },
]);
