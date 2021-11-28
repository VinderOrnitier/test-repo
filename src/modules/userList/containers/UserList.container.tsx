import React, { useEffect, FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchUsers } from '../userList.actions';
import { IUser } from '../userList.types';

const UsersContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.userReducer);

  // const dispatch = useReduxDispatch();
  // const { users, loading, error } = useSelector(getUserList)

  useEffect(() => {
    dispatch(fetchUsers());
  }, []); // eslint-disable-line

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <div>
      <ul>
        {users.map((user: IUser) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersContainer;
