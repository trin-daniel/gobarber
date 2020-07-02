import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Background, Container, Content, AnimationContainer } from './styles';
import getValidationErrors from '../../utils/getValidatorErros';

import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface SignUpFormData {
  email: string;
  name: string;
  password: string;
}
const Signup: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('name is required'),
          email: Yup.string()
            .required('E-mail is required')
            .email('Invalid format e-mail'),
          password: Yup.string().min(
            6,
            'Password must be at least 6 characters',
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/users', data);
        history.push('/');
        addToast({
          type: 'success',
          title: 'Register success',
          description: 'You can use access',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErrors(err);
          formRef.current?.setErrors(erros);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro',
        });
      }
    },
    [addToast, history],
  );
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="Gobarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input
              name="name"
              icon={FiUser}
              type="text"
              autoComplete="off"
              placeholder="Nome"
            />
            <Input
              name="email"
              icon={FiMail}
              type="email"
              autoComplete="off"
              placeholder="E-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar a logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default Signup;
