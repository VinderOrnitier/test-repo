import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import * as yup from 'yup';

import { AppContext } from '../../core/AppContextProvider';
import { VInput, VButton } from '../../../components';
import { ILoginForm } from '../login.types';
import { SignInSchema } from '../../../yup';
import { useLogIn, useSignUp, useAuthContext } from '../../../hooks';

const LoginContainer = () => {
  const { auth } = useContext(AppContext);
  const { dispatch } = useAuthContext();
  const { login, error: loginError } = useLogIn();
  const { signup, error: signupError } = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver<yup.AnyObjectSchema>(SignInSchema),
    mode: 'onChange',
  });

  const onLogIn = async (data: any) => {
    login(data?.email, data?.password);
  };

  const onSignUp = async (data: any) => {
    signup(data?.email, data?.password);
  };

  const onLogInWithGoggle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((res: any) => {
          dispatch({ type: 'LOGIN', payload: res.user });
        })
        .catch((err: any) => {
          console.log(err);
        });
    // try {
    //   const provider = new GoogleAuthProvider();
    //   const { user } = await auth.signInWithPopup(provider);
    //   dispatch({ type: 'LOGIN', payload: user });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <h2 className="text-3xl text-center font-bold my-4">Login</h2>
      <hr className="my-4" />
      {(loginError || signupError) && <p className="mb-4 text-red-900">{loginError || signupError}</p>}
      <form className="flex flex-col items-baseline">
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <>
              <VInput className="w-full mb-4" value={value} onChange={onChange} placeholder="Your email" />
              {errors.email && <span className="text-red-900 mb-4">{errors.email?.message}</span>}
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
                type="password"
                className="w-full mb-4"
                value={value}
                onChange={onChange}
                placeholder="Password"
              />
              {errors.password && <span className="text-red-900 mb-4">{errors.password?.message}</span>}
            </>
          )}
        />
        <div className="flex w-full items-center justify-between mb-8">
          <VButton onClick={handleSubmit(onLogIn)}>Log In</VButton>
          <VButton onClick={handleSubmit(onSignUp)}>Sign Up</VButton>
        </div>
      </form>
      <VButton onClick={onLogInWithGoggle}>Log In with Google</VButton>
    </>
  );
};

export default LoginContainer;
