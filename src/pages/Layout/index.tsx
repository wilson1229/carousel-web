import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import { SettingOutlined, FundViewOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(
    /\/manage\/.*/.test(location.pathname) ? 'manage' : 'carousel'
  );

  const items: MenuProps['items'] = [
    {
      label: 'Carousel',
      key: 'carousel',
      onClick: () => {
        navigate('/');
      },
      icon: <FundViewOutlined />
    },
    {
      label: 'Manage',
      key: 'manage',
      onClick: () => {
        navigate(`/manage/${window.defaultCarouselId}`);
      },
      icon: <SettingOutlined />
    }
  ];
  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };
  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Outlet />
    </div>
  );
};

export default Layout;
