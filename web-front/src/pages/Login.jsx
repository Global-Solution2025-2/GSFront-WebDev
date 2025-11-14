import { useState } from 'react'
import { useAuth } from '../contexts/AuthContexts'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('senha123')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async e => {
    e.preventDefault()
    setMessage('')

    try {
      const result = await login(username, password)

      if (result.success) {
        navigate('/')
      } else {
        setMessage(result.message || 'Usuário ou senha inválidos.')
      }
    } catch (error) {
      console.error('Erro na autenticação:', error)
      setMessage('Ocorreu um erro ao autenticar. Tente novamente.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-500 text-white text-xl font-bold">
            GS
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            GS Front-End
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Rede de Profissionais • Futuro do Trabalho
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-blue-500/60 focus:bg-white focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-blue-500/60 focus:bg-white focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50"
              required
            />
            <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
              Dica para testes: <span className="font-mono">admin / senha123</span>
            </p>
          </div>

          {message && (
            <p className="text-center text-sm font-medium text-red-500">{message}</p>
          )}

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-slate-950"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
