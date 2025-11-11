import { useState } from 'react';
import { useAuth } from '../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('senha123');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const result = await login(username, password);
      
      if (result.success) {
        navigate('/');
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">GS Front-End</h1>
        <h2 className="text-xl text-center mb-6">Rede de Profissionais</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>

          {message && (
            <p className="text-center mb-4 text-red-500">{message}</p>
          )}

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}