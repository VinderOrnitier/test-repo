import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";

import { useReduxDispatch } from "../../../helpers";
import { fetchUsers } from "../userList.actions";
import { getUserList } from "../userList.selectors";

export default function UsersContainer(): ReactElement {
  const { users, loading, error } = useSelector(getUserList)

  const dispatch = useReduxDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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