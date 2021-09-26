import React, { useContext, FormEvent } from 'react';
import { LoginContext } from '..';
import { VInput, VButton } from '../../../components';
import { LOCAL_STORAGE_KEYS } from '../../../constants';

const LoginContainer = () => {
  const { user, setUser } = useContext(LoginContext);

  const onLogIn = (newUser: any) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, 'true');
    sessionStorage.setItem(LOCAL_STORAGE_KEYS.USER_INFO, JSON.stringify(newUser))
  }

  const addNewUser = (e: React.FormEvent<FormEvent>) => {
    e.preventDefault();
    const newUser = {
      ...user,
      id: Date.now(),
    };
    setUser(newUser);
    // localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, 'true');
    // sessionStorage.setItem(LOCAL_STORAGE_KEYS.USER_INFO, JSON.stringify(newUser))
    onLogIn(newUser);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: e.target.value });
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: e.target.value });
  };

  return (
    <>
      <h2 className="text-3xl text-center font-bold my-4">Login</h2>
      <hr className="my-4" />
      <form className="flex flex-col items-baseline">
        <VInput className="w-full mb-4" type="text" value={user?.email} onChange={onChangeEmail} placeholder="User email" />
        <VInput className="w-full mb-4" type="text" value={user?.name} onChange={onChangeName} placeholder="User name" />
        <VButton onClick={addNewUser}>Log In</VButton>
      </form>
    </>
  );
};

export default LoginContainer;
