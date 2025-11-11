import { useState } from 'react';
import perfisData from './data/perfis.json'; 
import './index.css'; 

function App() {
  const [perfis, setPerfis] = useState(perfisData);

  return (
    <div className="container mx-auto p-4"> 
      
      <h1 className="text-3xl font-bold mb-4">Plataforma Futuro do Trabalho</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {perfis.map((perfil) => (
          <div key={perfil.id} className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">{perfil.nome}</h2>
            <p className="text-gray-600">{perfil.cargo} [cite: 11]</p>
            <p className="text-sm mt-2">{perfil.resumo}</p>
            <div className="mt-2">
              <span className="text-xs font-medium text-blue-800">Skills: </span>
              <span className="text-sm text-gray-700">
                {perfil.habilidadesTecnicas.slice(0, 3).join(', ')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;