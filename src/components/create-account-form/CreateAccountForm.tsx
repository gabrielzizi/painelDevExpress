import React, { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  CustomRule,
  EmailRule
} from 'devextreme-react/form';
import notify from 'devextreme/ui/notify';
import LoadIndicator from 'devextreme-react/load-indicator';
import { createAccount } from '../../api/auth';
import { ValidationCallbackData } from 'devextreme-react/common';
import './CreateAccountForm.scss';

export default function CreateAccountForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formData = useRef({ email: '', password: '', name: '' });

  const onSubmit = useCallback(async (e: any) => {
    e.preventDefault();
    const { email, password, name } = formData.current;
    setLoading(true);

    const result = await createAccount(email, password, name);
    setLoading(false);

    if (result.isOk) {
      navigate('/login');
    } else {
      notify(result.message, 'error', 2000);
    }
  }, [navigate]);

  const confirmPassword = useCallback(
    ({ value }: ValidationCallbackData) => value === formData.current.password,
    []
  );

  return (
    <form className={'create-account-form'} onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading}>
      <Item
          dataField={'name'}
          editorType={'dxTextBox'}
          editorOptions={nameEditorOptions}
        >
          <RequiredRule message="Name is required" />
          <Label visible={false} />
      </Item>
        <Item
          dataField={'email'}
          editorType={'dxTextBox'}
          editorOptions={emailEditorOptions}
        >
          <RequiredRule message="O email é necessário" />
          <EmailRule message="Email inválido" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={'password'}
          editorType={'dxTextBox'}
          editorOptions={passwordEditorOptions}
        >
          <RequiredRule message="A senha é necessária" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={'confirmedPassword'}
          editorType={'dxTextBox'}
          editorOptions={confirmedPasswordEditorOptions}
        >
          <RequiredRule message="A senha é necessária" />
          <CustomRule
            message={'Senhas não iguais'}
            validationCallback={confirmPassword}
          />
          <Label visible={false} />
        </Item>
        {/* <Item>
          <div className='policy-info'>
            By creating an account, you agree to the <Link to="#">Terms of Service</Link> and <Link to="#">Privacy Policy</Link>
          </div>
        </Item> */}
        <ButtonItem cssClass='btn'>
          <ButtonOptions
            width={'100%'}
            type={'default'}
            useSubmitBehavior={true}
          >
            <span className="dx-button-text">
              {
                loading
                  ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                  : 'Criar Conta'
              }
            </span>
          </ButtonOptions>
        </ButtonItem>
        <Item>
          <div className={'login-link link'}>
          <span style={{color: "rgba(0, 0, 0, 0.774)"}}>Já possui conta?</span> <Link to={'/login'}>Voltar</Link>
          </div>
        </Item>
      </Form>
    </form>
  );
}

const emailEditorOptions = { stylingMode: 'filled', placeholder: 'Email', mode: 'email' };
const nameEditorOptions = { stylingMode: 'filled', placeholder: 'Nome', mode: 'text' };
const passwordEditorOptions = { stylingMode: 'filled', placeholder: 'Senha', mode: 'password' };
const confirmedPasswordEditorOptions = { stylingMode: 'filled', placeholder: 'Confirmar Senha', mode: 'password' };
