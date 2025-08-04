import React from 'react';
import { Layout, Menu} from 'antd/';
import './Topbar.css';
import { useNavigate } from 'react-router-dom';
import { RoleSelect } from '../RoleSelect';

const { Header } = Layout;


const menuItems = [
    { key: '/', label: 'דאשבורד' },
    { key: '1', label: 'לוח שנה' },
  { key: '2', label: 'תכני קורס' },
  { key: '3', label: 'פתקים' },
  { key: '4', label: 'סקרים' },
  { key: '5', label: 'מבחנים' },
  { key: '6', label: 'משובים' },
];


const Topbar: React.FC = () => {

   const navigate = useNavigate();

  return (
    <Header className="topbar">
       <RoleSelect />
      <Menu
        theme="light"
        mode="horizontal"
        items={menuItems}
          onClick={(e) => navigate(e.key)}
        style={{ width:'100%' }}
        defaultSelectedKeys={['/']} 
      />
    
    </Header>
  );
};

export default Topbar;
