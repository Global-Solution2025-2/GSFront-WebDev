import { useState, useEffect, useMemo } from 'react'
import perfisData from '../data/perfis.json'
import ProfileCard from '../components/ProfileCard'
import ProfileModal from '../components/ProfileModal'
import SearchBar from '../components/SearchBar'
import { useAuth } from '../contexts/AuthContexts'
import Inbox from '../components/Inbox'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useTheme } from '../contexts/ThemeContext'
import { Moon, Sun } from 'lucide-react'

export default function Home() {
  const { logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const [perfis, setPerfis] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState(null)

  const [busca, setBusca] = useState('')
  const [filtroArea, setFiltroArea] = useState('')
  const [filtroLocal, setFiltroLocal] = useState('')
  const [inbox, setInbox] = useLocalStorage('inbox-messages', [])

  useEffect(() => {
    setPerfis(perfisData)
  }, [])

  const perfisFiltrados = useMemo(() => {
    return perfis
      .filter(p => (filtroArea === '' ? true : p.area === filtroArea))
      .filter(p => (filtroLocal === '' ? true : p.localizacao.includes(filtroLocal)))
      .filter(p => {
        if (busca === '') return true
        const buscaLower = busca.toLowerCase()
        return (
          p.nome.toLowerCase().includes(buscaLower) ||
          p.cargo.toLowerCase().includes(buscaLower) ||
          p.habilidadesTecnicas.some(skill => skill.toLowerCase().includes(buscaLower))
        )
      })
  }, [perfis, busca, filtroArea, filtroLocal])

  const handleCardClick = perfil => {
    setSelectedProfile(perfil)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedProfile(null)
  }

  const handleSendMessage = newMsg => {
    setInbox([...inbox, newMsg])
  }

  const areasUnicas = useMemo(() => [...new Set(perfis.map(p => p.area))], [perfis])
  const locaisUnicos = useMemo(
    () =>
      [...new Set(perfis.map(p => p.localizacao.split('/')[1]?.trim()).filter(Boolean))],
    [perfis]
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur dark:bg-slate-900/80 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-purple-500 text-white text-lg font-bold">
              GS
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                Futuro do Trabalho
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Conectando talentos, competências e propósito
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <Inbox inbox={inbox} />
            <Button
              variant="outline"
              className="border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-100"
            >
              {perfis.length} perfis
            </Button>
            <Button variant="destructive" onClick={logout}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        <section className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-5 text-white shadow-md">
          <h2 className="text-lg font-semibold">
            Rede Profissional • Global Solution 2025.2
          </h2>
          <p className="mt-1 text-sm text-blue-100 max-w-2xl">
            Explore profissionais fictícios com diferentes formações, experiências e interesses.
            Use os filtros para encontrar perfis alinhados ao futuro do trabalho.
          </p>
        </section>

        <SearchBar
          onBuscaChange={setBusca}
          onAreaChange={setFiltroArea}
          onLocalChange={setFiltroLocal}
          areas={areasUnicas}
          locais={locaisUnicos}
        />

        <section className="mt-2">
          {perfisFiltrados.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 text-sm dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400">
              Nenhum profissional encontrado com os filtros atuais. Ajuste a busca ou os filtros
              para visualizar outros perfis.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {perfisFiltrados.map(perfil => (
                <ProfileCard
                  key={perfil.id}
                  perfil={perfil}
                  onCardClick={handleCardClick}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {modalOpen && selectedProfile && (
        <ProfileModal
          perfil={selectedProfile}
          onClose={handleCloseModal}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  )
}
