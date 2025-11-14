import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { toast } from 'sonner'

function RecommendationForm({ onSave }) {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    if (text.trim().length < 10) {
      toast.error('Sua recomendação precisa ter pelo menos 10 caracteres.')
      return
    }

    onSave({ text, author: 'Admin (Usuário Logado)' })
    setText('')
    toast.success('Sua recomendação foi salva.')
  }

  return (
    <div className="grid gap-4 py-4">
      <Label htmlFor="recommendation-text">Escreva sua recomendação:</Label>
      <Textarea
        id="recommendation-text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Descreva por que você recomenda este profissional..."
        rows={5}
      />
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" onClick={handleSubmit}>
            Salvar recomendação
          </Button>
        </DialogClose>
      </DialogFooter>
    </div>
  )
}

function MessageForm({ profileName, onSend }) {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    if (text.trim().length === 0) {
      toast.error('Escreva uma mensagem.')
      return
    }
    onSend({ to: profileName, text, from: 'Admin', date: new Date().toISOString() })
    setText('')
    toast.success(`Mensagem para ${profileName} foi salva no seu Inbox.`)
  }

  return (
    <div className="grid gap-4 py-4">
      <Label htmlFor="message-text">Sua mensagem:</Label>
      <Textarea
        id="message-text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={`Escreva uma mensagem para ${profileName}...`}
        rows={5}
      />
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" onClick={handleSubmit}>
            Enviar mensagem
          </Button>
        </DialogClose>
      </DialogFooter>
    </div>
  )
}

export default function ProfileModal({ perfil, onClose, onSendMessage }) {
  const [recommendations, setRecommendations] = useLocalStorage(
    `recs-${perfil.id}`,
    []
  )

  const handleSaveRecommendation = newRec => {
    setRecommendations([...recommendations, newRec])
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/70 p-4">
      <div className="flex w-full max-w-5xl max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900 dark:text-slate-50">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <img
              src={perfil.foto}
              alt={perfil.nome}
              className="h-14 w-14 rounded-full border-2 border-blue-500/60 object-cover bg-slate-100"
            />
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                {perfil.nome}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {perfil.cargo}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {perfil.localizacao} •{' '}
                <span className="text-blue-600 dark:text-blue-400">{perfil.area}</span>
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 text-xl"
          >
            ×
          </Button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-5 bg-slate-50 dark:bg-slate-950">
          <div className="grid gap-6 md:grid-cols-3">
            {/* COLUNA ESQUERDA */}
            <div className="space-y-5 md:col-span-1">
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xs font-medium uppercase text-slate-500 dark:text-slate-400">
                  Resumo profissional
                </p>
                <p className="mt-2 text-sm text-slate-700 italic dark:text-slate-200">
                  “{perfil.resumo}”
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Habilidades técnicas
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {perfil.habilidadesTecnicas.map(skill => (
                    <span
                      key={skill}
                      className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Soft skills
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {perfil.softSkills.map(skill => (
                    <span
                      key={skill}
                      className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {perfil.areaInteresses.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Áreas de interesse
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {perfil.areaInteresses.map(interesse => (
                      <span
                        key={interesse}
                        className="rounded-full bg-purple-50 px-3 py-1 text-[11px] font-medium text-purple-700 dark:bg-purple-900/40 dark:text-purple-200"
                      >
                        {interesse}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* COLUNA DIREITA */}
            <div className="space-y-5 md:col-span-2">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Experiências
                </h4>
                <div className="mt-3 space-y-3">
                  {perfil.experiencias.map((exp, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
                    >
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                        {exp.cargo} @ {exp.empresa}
                      </p>
                      <p className="text-[11px] uppercase text-slate-500 dark:text-slate-400">
                        {exp.inicio} – {exp.fim}
                      </p>
                      <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                        {exp.descricao}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                    Formação
                  </h4>
                  <div className="mt-3 space-y-3">
                    {perfil.formacao.map((f, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
                      >
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                          {f.curso}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {f.instituicao} • Ano {f.ano}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {perfil.projetos.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                        Projetos
                      </h4>
                      <div className="mt-3 space-y-2">
                        {perfil.projetos.map((proj, i) => (
                          <div key={i}>
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
                            >
                              {proj.titulo}
                            </a>
                            <p className="text-xs text-slate-600 dark:text-slate-300">
                              {proj.descricao}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {perfil.certificacoes.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                        Certificações
                      </h4>
                      <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-700 dark:text-slate-200">
                        {perfil.certificacoes.map((cert, i) => (
                          <li key={i}>{cert}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {perfil.idiomas.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                        Idiomas
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-700 dark:text-slate-200">
                        {perfil.idiomas.map((lang, i) => (
                          <span key={i}>
                            <span className="font-semibold">{lang.idioma}:</span>{' '}
                            {lang.nivel}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Recomendações ({recommendations.length})
                </h4>
                <div className="mt-3 space-y-3">
                  {recommendations.length === 0 && (
                    <p className="text-sm text-slate-500 italic dark:text-slate-400">
                      Este profissional ainda não tem recomendações.
                    </p>
                  )}
                  {recommendations.map((rec, index) => (
                    <blockquote
                      key={index}
                      className="rounded-lg border-l-4 border-blue-500 bg-white px-4 py-3 text-sm text-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:border-blue-400"
                    >
                      <p>"{rec.text}"</p>
                      <footer className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        – {rec.author}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50/80 px-6 py-3 dark:border-slate-800 dark:bg-slate-900/80">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                Enviar mensagem
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px]">
              <DialogHeader>
                <DialogTitle>Enviar mensagem</DialogTitle>
                <DialogDescription>
                  Sua mensagem será salva no seu inbox local.
                </DialogDescription>
              </DialogHeader>
              <MessageForm profileName={perfil.nome} onSend={onSendMessage} />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Escrever recomendação</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px]">
              <DialogHeader>
                <DialogTitle>Recomendar {perfil.nome}</DialogTitle>
                <DialogDescription>
                  A recomendação ficará visível no perfil deste profissional.
                </DialogDescription>
              </DialogHeader>
              <RecommendationForm onSave={handleSaveRecommendation} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
