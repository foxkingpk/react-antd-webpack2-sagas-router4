import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
 
const SubMenu = Menu.SubMenu;

const RecursiveMenus = (menuTreeN, siderFoldN) => {
    return menuTreeN.map(item => {
      if (item.children && item.children.length>0) {
        return (
          <SubMenu
            key={item.key}
            title={<span>
              {item.icon && <Icon type={item.icon} />}
              <span className="nav-text">{item.name}</span>
            </span>}
          >
            {RecursiveMenus(item.children, siderFoldN)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.key}>
          <Link to={item.path}>
            {item.icon && <Icon type={item.icon} />}
            <span className="nav-text">{item.name}</span>
          </Link>
        </Menu.Item>
      );
    });
  }
  export default RecursiveMenus;