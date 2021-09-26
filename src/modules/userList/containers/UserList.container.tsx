import React, { useEffect, FC } from "react";
import { useSelector } from "react-redux";

import { useReduxDispatch } from "../../../hooks";
import { fetchUsers } from "../userList.actions";
import { getUserList } from "../userList.selectors";

const UsersContainer: FC = () => {
  const { users, loading, error } = useSelector(getUserList)

  const dispatch = useReduxDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []) // eslint-disable-line

  if (loading) {
    return <h3>Loading...</h3>
  }

  if (error) {
    return <h3>{error}</h3>
  }
  
  return (
    <div>
      <ul>
        {users.map((user: any) =>
          <li key={user.id}>{user.name}</li>
        )}
      </ul>
    </div>
  )
}

export default UsersContainer;