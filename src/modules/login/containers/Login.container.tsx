import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GoogleAuthProvider } from "firebase/auth";

import { AppContext } from '../../core/AppContextProvider';
import { LoginContext } from '..';
import { VInput, VButton } from '../../../components';
import { LOCAL_STORAGE_KEYS, PATH } from '../../../constants';
import { ILoginForm } from '../login.types';
import { SignInSchema } from '../../../yup';
import { history } from '../../../utils';

const LoginContainer = () => {
  const { setUser } = useContext(LoginContext);
  const { auth } = useContext(AppContext);

  const { control, handleSubmit, formState: { errors } } = useForm<ILoginForm>({
    // @ts-ignore
    resolver: yupResolver(SignInSchema),
    mode: 'onChange',
  });

  const onLogIn = (newUser: any) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, 'true');
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER_INFO, JSON.stringify(newUser));
    history.push(PATH.ROOT);
  };

  const onLogInWithGoggle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const {user} = await auth.signInWithPopup(provider);
      setUser(user)
      onLogIn(user);
    } catch (error) {
      console.log(error)
    }
  };

  const addNewUser = (data: any) => {
    const newUser = {
      ...data,
      id: Date.now(),
    };
    setUser(newUser);
    onLogIn(newUser);
  };

  return (
    <>
      <h2 className="text-3xl text-center font-bold my-4">Login</h2>
      <hr className="my-4" />
      <form className="flex flex-col items-baseline" onSubmit={handleSubmit(data => addNewUser(data))}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <>
              <VInput
                className="w-full mb-4"
                value={value}
                onChange={onChange}
                placeholder="Your email"
              />
              { errors.email && <span className="text-red-900 mb-4">{errors.email?.message}</span> }
            </>
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <>
              <VInput
                type='password'
                className="w-full mb-4"
                value={value}
                onChange={onChange}
                placeholder="Password"
              />
              { errors.password && <span className="text-red-900 mb-4">{errors.password?.message}</span> }
            </>
          )}
        />
        <VButton className="mb-8">Log In</VButton>
      </form>
      <VButton onClick={onLogInWithGoggle}>Log In with Google</VButton>
    </>
  );
};

export default LoginContainer;
