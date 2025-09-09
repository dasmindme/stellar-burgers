import { FC, SyntheticEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import {
  loginUser,
  makeLoginUserSuccess
} from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, handleChange, setValues } = useForm({
    email: '',
    password: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser(values))
      .unwrap()
      .then((data) => {
        try {
          localStorage.setItem('refreshToken', data.refreshToken);
          setCookie('accessToken', data.accessToken);
        } catch (err) {
          return new Error('error');
        }
      })
      .then(() => dispatch(makeLoginUserSuccess(true)))
      .then(() => navigate('/'));
  };

  return (
    <LoginUI
      errorText=''
      email={values.email}
      setEmail={(value: string) =>
        setValues((prev) => ({ ...prev, email: value }))
      }
      password={values.password}
      setPassword={(value: string) =>
        setValues((prev) => ({ ...prev, password: value }))
      }
      handleSubmit={handleSubmit}
    />
  );
};
