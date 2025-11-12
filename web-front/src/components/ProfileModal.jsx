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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{perfil.nome}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 text-2xl">&times;</Button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 text-center">
            <img src={perfil.foto} alt={perfil.nome} className="w-32 h-32 rounded-full mx-auto" />
            <p className="font-bold mt-2">{perfil.cargo}</p>
            <p className="text-sm text-gray-600">{perfil.localizacao}</p>
            <p className="text-sm mt-4">{perfil.resumo}</p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div>
              <h4 className="font-bold">Habilidades Técnicas</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {perfil.habilidadesTecnicas.map(skill => (
                  <span key={skill} className="bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold">Soft Skills</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {perfil.softSkills.map(skill => (
                  <span key={skill} className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold">Experiências</h4>
              {perfil.experiencias.map((exp, i) => (
                <div key={i} className="mt-1">
                  <p className="text-sm font-semibold">{exp.cargo} @ {exp.empresa}</p>
                  <p className="text-xs text-gray-500">{exp.inicio} - {exp.fim}</p>
                  <p className="text-sm">{exp.descricao}</p>
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-bold">Recomendações ({recommendations.length})</h4>
              <div className="mt-2 space-y-2">
                {recommendations.length === 0 && (
                  <p className="text-sm text-gray-500">Este profissional ainda não tem recomendações.</p>
                )}
                {recommendations.map((rec, index) => (
                  <blockquote key={index} className="border-l-4 pl-4 italic">
                    <p>"{rec.text}"</p>
                    <footer className="text-xs not-italic">- {rec.author}</footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 p-4 border-t bg-gray-50">
          
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