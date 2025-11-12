import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Inbox({ inbox }) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          
          {inbox.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {inbox.length}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Inbox (Mensagens Enviadas)</DialogTitle>
          <DialogDescription>
            Aqui estão as mensagens que você enviou.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto space-y-4 p-1">
          {inbox.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-8">Nenhuma mensagem enviada.</p>
          )}
          {[...inbox].reverse().map((msg, index) => (
            <div key={index} className="border rounded-lg p-4">
              <p className="text-sm font-semibold">Para: {msg.to}</p>
              <p className="text-xs text-gray-500 mb-2">
                Em: {new Date(msg.date).toLocaleString('pt-BR')}
              </p>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}