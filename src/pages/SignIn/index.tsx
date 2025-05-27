import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleNotch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { callApi } from '../../services/api';
import { ApiError } from '../../constants/errors';

import type LoginInterface from '../../interfaces/login';

import './index.css';
import BillumyLogo from '../../assets/billumy.png';

export default function SignIn() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const isActiveUsername = username !== '' && usernameTouched;
  const isActivePassword = password !== '' && passwordTouched;
  
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
      toast.success('Login realizado com sucesso!', {
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

  const getUserProfile = async () => {
    try {
      const result = await callApi('profile', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userSessionKeys')).access}`,
        },
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

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if(username && password){
      const userData = {
        username,
        password,
      };

      try {
        const result = await login(userData);
        if (result) {
          localStorage.setItem('userSessionKeys', result);
          
          const userProfile = await getUserProfile();
          localStorage.setItem('userProfile', userProfile);

          setSuccess(true);
          navigate('/');
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    } 
    else{
        setLoading(false);
      setError('Preencha todos os campos');
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
          <form onSubmit={handleLogin}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginBottom: '2rem' }}>
              <span className='fs-1 font-bold text-black'>Entrar</span>
              <span className='fs-5 font-light text-black'>Preencha os dados do seu Usuário</span>
            </div>

            <div className="form-sign-in-input">
              <div className='w-100 input-form'>
                <input
                  className="form-input"
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => setUsernameTouched(true)}
                  onFocus={() => setUsernameTouched(false)}
                  required
                />
                <label className={!isActiveUsername ? 'form-label' : 'form-label form-touched'} htmlFor="username">Usuário</label>
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

              <Link className="link text-primary" to="/">Esqueceu sua Senha?</Link>
            </div>

            <button className="btn btn-primary btn-sign-in fs-5" type="submit" disabled={loading}>
              {loading ? <FontAwesomeIcon className="loading" icon={faCircleNotch} /> : 'Entrar'}
            </button>
          </form>

          <div className='container-sign-in-footer'>
            <span className='fs-5 font-light text-black'>Não tem uma conta?</span>
            <Link className="link text-primary" to="/signup">Cadastre-se</Link>
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
