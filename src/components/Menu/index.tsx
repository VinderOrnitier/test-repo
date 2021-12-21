import React from 'react';
import { NavLink } from 'react-router-dom';

interface Menu {
  path: string,
  name: string,
  exact?: boolean | undefined,
}

interface Props {
  menuArray: Menu[]
}

const VMenu = ({menuArray}: Props) => {

  return (
    <ul className="flex items-center">
      {menuArray.map((item: Menu) => (
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
