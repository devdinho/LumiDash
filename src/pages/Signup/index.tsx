import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleNotch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { callApi } from '../../services/api';
import { ApiError } from '../../constants/errors';

import type CreateUserInterface from '../../interfaces/createUser';
import type LoginInterface from '../../interfaces/login';

import './index.css';
import BillumyLogo from '../../assets/billumy.png';

export default function SignUp() {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstnameTouched, setFirstnameTouched] = useState(false);
  const [lastnameTouched, setLastnameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const isActiveFirstname = firstname !== '' && firstnameTouched;
  const isActiveLastname = lastname !== '' && lastnameTouched;
  const isActiveEmail = email !== '' && emailTouched;
  const isActivePassword = password !== '' && passwordTouched;
  const isActiveConfirmPassword = confirmPassword !== '' && confirmPasswordTouched;
  
  //
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    const userSessionKeys = localStorage.getItem('userSessionKeys');
    if (userSessionKeys) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (error) {
      toast.warn(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (success) {
      toast.success('Cadastro realizado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [error, success]);
  
  const register = async (userData: CreateUserInterface) => {
    try {
      const result = await callApi('register', {
        body: userData,
      });
      return result;
    } catch (error) {

      let errorMessage = ApiError.ERROR_CHOICES.find(item => item.value === error.message).label;

      if (!errorMessage) {
        errorMessage = 'Erro desconhecido'
      }
      throw errorMessage;
    }
  };

  const login = async (userData: LoginInterface) => {
    try {
      const result = await callApi('login', {
        body: userData,
      });
      return result;
    } catch (error) {

      let errorMessage = ApiError.ERROR_CHOICES.find(item => item.value === error.message).label;

      if (!errorMessage) {
        errorMessage = 'Erro desconhecido'
      }
      throw errorMessage;
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }
    if (!firstname || !lastname || !email || !password) {
      setError('Preencha todos os campos obrigatórios');
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres');
      setLoading(false);
      return;
    }

    const userData = {
        "first_name": firstname,
        "last_name": lastname,
        "username": email,
        "password": password,
        "email": email,
    };

    try {
      const result = await register(userData);
      if (result) {
        localStorage.setItem('userProfile', result);

        const loginData = {
          username: email,
          password: password,
        };

        const loginResult = await login(loginData);

        localStorage.setItem('userSessionKeys', loginResult);
        
        setSuccess(true);
        navigate('/');
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <div className='container-go-back'>
        <FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faArrowLeft} />
        <Link className="link text-black" to="/">Voltar</Link>
      </div>
      <div className='container-sign-in'>
        <div className="form-sign-in">
        
          <form onSubmit={handleRegister}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginBottom: '2rem' }}>
              <span className='fs-1 font-bold text-black'>Cadastre-se</span>
              <span className='fs-5 font-light text-black'>Preencha os dados do seu Usuário</span>
            </div>

            <div className='w-100 input-form'>
              <input
                className="form-input"
                type="text"
                id="firstname"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                onBlur={() => setFirstnameTouched(true)}
                onFocus={() => setFirstnameTouched(false)}
                required
              />
              <label
                className={!isActiveFirstname ? 'form-label' : 'form-label form-touched'}
                htmlFor="firstname"
              >
                Nome
              </label>
            </div>

            <div className='w-100 input-form'>
              <input
                className="form-input"
                type="text"
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                onBlur={() => setLastnameTouched(true)}
                onFocus={() => setLastnameTouched(false)}
                required
              />
              <label
                className={!isActiveLastname ? 'form-label' : 'form-label form-touched'}
                htmlFor="lastname"
              >
                Sobrenome
              </label>
            </div>

            <div className='w-100 input-form'>
              <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                onFocus={() => setEmailTouched(false)}
                required
              />
              <label
                className={!isActiveEmail ? 'form-label' : 'form-label form-touched'}
                htmlFor="email"
              >
                E-mail
              </label>
            </div>

            <div className='w-100 input-form'>
              
              <input
                className="form-input"
                type={ showPassword? "text":"password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                onFocus={() => setPasswordTouched(false)}
                required
              />

              <label className={!isActivePassword ? 'form-label' : 'form-label form-touched'} htmlFor="password">Senha</label>

              <span className='eye-icon' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 
                  <FontAwesomeIcon icon={faEye} />
                  :
                  <FontAwesomeIcon icon={faEyeSlash} />
                }
              </span>
              
            </div>

            <div className='w-100 input-form'>
              
              <input
                className="form-input"
                type={ showConfirmPassword? "text":"password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => setConfirmPasswordTouched(true)}
                onFocus={() => setConfirmPasswordTouched(false)}
                required
              />

              <label className={!isActiveConfirmPassword ? 'form-label' : 'form-label form-touched'} htmlFor="confirmPassword">Confirme sua senha</label>

              <span className='eye-icon' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? 
                  <FontAwesomeIcon icon={faEye} />
                  :
                  <FontAwesomeIcon icon={faEyeSlash} />
                }
              </span>
              
            </div>

            <button className="btn btn-primary btn-sign-in fs-5" type="submit" disabled={loading}>
              {loading ? <FontAwesomeIcon className="loading" icon={faCircleNotch} /> : 'Cadastrar'}
            </button>
          </form>

          <div className='container-sign-in-footer'>
            <span className='fs-5 font-light text-black'>Já tem uma conta?</span>
            <Link className="link text-primary" to="/signin">Realize o login</Link>
          </div>

        </div>

        <div className='container-sign-in-logo'>
          <div className='container-sign-in-logo-image'>
            <img src={BillumyLogo} className="personsImageStyle" alt="Logo" />
          </div>
          <div className='container-sign-in-content'>
            <span className='title-1 text-black font-bold'>Bem Vindo ao Lumi</span>
            <span className='title-2 text-black '>Entre para acessar seu perfil</span>
          </div>
        </div>

      </div>
    </div>
  );
}
