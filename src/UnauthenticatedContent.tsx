import { Routes, Route, Navigate } from 'react-router-dom';
import { SingleCard } from './layouts';
import { LoginForm, ResetPasswordForm, ChangePasswordForm, CreateAccountForm } from './components';

export default function UnauthenticatedContent() {
  return (
    <Routes>
      <Route
        path='/login' 
        element={
          <SingleCard title="Login" className='signInClass'>
            <LoginForm />
          </SingleCard>
        }
      />
      <Route
        path='/create-account'
        element={
          <SingleCard title="Criar conta">
            <CreateAccountForm />
          </SingleCard>
        }
      />
      <Route 
        path='/reset-password'
        element={
          <SingleCard
            title="Resetar Senha"
            description="Por favor, insira o endereço de e-mail que você usou para se registrar e enviaremos um link para redefinir sua senha por e-mail."
          >
            <ResetPasswordForm />
          </SingleCard>
        }
      />
      <Route
        path='/change-password/:recoveryCode'
        element={
          <SingleCard title="Change Password">
            <ChangePasswordForm />
          </SingleCard>
        }
      />
      <Route path='*' element={<Navigate to={'/login'} />}></Route>
    </Routes>
  );
}
