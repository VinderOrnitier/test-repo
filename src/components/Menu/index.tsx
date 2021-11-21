import React from 'react';
import { NavLink } from 'react-router-dom';

const VMenu = ({menuArray}: any) => {

  return (
    <ul className="flex items-center">
      {menuArray.map((item: any) => (
        <li key={item.name} className="ml-6 text-white underline hover:text-black">
          <NavLink
            to={item.path}
            exact={!item?.exact}
            activeStyle={{ color: 'black' }}
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default VMenu;
