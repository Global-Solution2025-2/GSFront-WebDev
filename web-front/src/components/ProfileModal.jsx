import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner";

function RecommendationForm({ onSave }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim().length < 10) {
      toast.error("Sua recomendação precisa ter pelo menos 10 caracteres.");
      return;
    }
    
    onSave({ text, author: "Admin (Usuário Logado)" });
    setText('');
    
    toast.success("Sua recomendação foi salva.");
  };

  return (
    <div className="grid gap-4 py-4">
      <Label htmlFor="recommendation-text">Escreva sua recomendação:</Label>
      <Textarea
        id="recommendation-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Descreva por que você recomenda este profissional..."
        rows={5}
      />
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" onClick={handleSubmit}>Salvar Recomendação</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}

function MessageForm({ profileName, onSend }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
     if (text.trim().length === 0) {
      toast.error("Escreva uma mensagem.");
      return;
    }
    onSend({ to: profileName, text, from: "Admin", date: new Date().toISOString() });
    setText('');
    toast.success(`Mensagem para ${profileName} foi salva no seu Inbox.`);
  };

  return (
    <div className="grid gap-4 py-4">
      <Label htmlFor="message-text">Sua mensagem para {profileName}:</Label>
      <Textarea
        id="message-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escreva sua mensagem..."
        rows={5}
      />
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" onClick={handleSubmit}>Enviar Mensagem</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}


export default function ProfileModal({ perfil, onClose, onSendMessage }) {
  
  const [recommendations, setRecommendations] = useLocalStorage(
    `recs-${perfil.id}`, 
    []
  );

  const handleSaveRecommendation = (newRec) => {
    setRecommendations([...recommendations, newRec]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">{perfil.nome}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 text-2xl">&times;</Button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="md:col-span-1 text-center">
            <img src={perfil.foto} alt={perfil.nome} className="w-32 h-32 rounded-full mx-auto border-4 border-gray-100" />
            <p className="font-bold text-lg mt-2">{perfil.cargo}</p>
            <p className="text-sm text-gray-600">{perfil.localizacao}</p>
            <p className="text-sm text-blue-600 font-medium mt-1">{perfil.area}</p>
            
            <p className="text-sm mt-4 text-left italic border-l-4 pl-3">"{perfil.resumo}"</p>
          </div>

          <div className="md:col-span-2 space-y-5">
            
            <div>
              <h4 className="font-bold text-gray-800">Habilidades Técnicas</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {perfil.habilidadesTecnicas.map(skill => (
                  <span key={skill} className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-800">Soft Skills</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {perfil.softSkills.map(skill => (
                  <span key={skill} className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-800">Experiências</h4>
              {perfil.experiencias.map((exp, i) => (
                <div key={i} className="mt-2 pl-3 border-l-2">
                  <p className="text-sm font-semibold">{exp.cargo} @ {exp.empresa}</p>
                  <p className="text-xs text-gray-500 uppercase">{exp.inicio} - {exp.fim}</p>
                  <p className="text-sm mt-1">{exp.descricao}</p>
                </div>
              ))}
            </div>
            
            <div>
              <h4 className="font-bold text-gray-800">Formação</h4>
              {perfil.formacao.map((f, i) => (
                <div key={i} className="mt-2 pl-3 border-l-2">
                  <p className="text-sm font-semibold">{f.curso}</p>
                  <p className="text-sm text-gray-600">{f.instituicao} (Ano: {f.ano})</p>
                </div>
              ))}
            </div>

            {perfil.projetos.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-800">Projetos</h4>
                {perfil.projetos.map((proj, i) => (
                  <div key={i} className="mt-2 pl-3 border-l-2">
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 hover:underline">{proj.titulo}</a>
                    <p className="text-sm mt-1">{proj.descricao}</p>
                  </div>
                ))}
              </div>
            )}

            {perfil.certificacoes.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-800">Certificações</h4>
                <ul className="list-disc list-inside mt-2">
                  {perfil.certificacoes.map((cert, i) => (
                    <li key={i} className="text-sm">{cert}</li>
                  ))}
                </ul>
              </div>
            )}

            {perfil.idiomas.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-800">Idiomas</h4>
                <div className="flex flex-wrap gap-4 mt-2">
                  {perfil.idiomas.map((lang, i) => (
                    <div key={i} className="text-sm">
                      <span className="font-semibold">{lang.idioma}:</span> {lang.nivel}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {perfil.areaInteresses.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-800">Áreas de Interesse</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {perfil.areaInteresses.map(interesse => (
                    <span key={interesse} className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                      {interesse}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h4 className="font-bold text-gray-800">Recomendações ({recommendations.length})</h4>
              <div className="mt-2 space-y-3">
                {recommendations.length === 0 && (
                  <p className="text-sm text-gray-500 italic">Este profissional ainda não tem recomendações.</p>
                )}
                {recommendations.map((rec, index) => (
                  <blockquote key={index} className="border-l-4 pl-4 italic bg-gray-50 p-2 rounded">
                    <p>"{rec.text}"</p>
                    <footer className="text-xs not-italic font-medium">- {rec.author}</footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 p-4 border-t bg-gray-50 sticky bottom-0 z-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Enviar Mensagem</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Enviar Mensagem</DialogTitle>
                <DialogDescription>
                  Sua mensagem será salva no seu inbox.
                </DialogDescription>
              </DialogHeader>
              <MessageForm 
                profileName={perfil.nome} 
                onSend={onSendMessage} 
              />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Escrever Recomendação</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Recomendar {perfil.nome}</DialogTitle>
                <DialogDescription>
                  A recomendação ficará visível no perfil deste profissional.
                </DialogDescription>
              </DialogHeader>
              <RecommendationForm 
                profileId={perfil.id} 
                onSave={handleSaveRecommendation} 
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}