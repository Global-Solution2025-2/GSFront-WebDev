import { useState, useEffect, useMemo } from 'react';
import perfisData from '../data/perfis.json'; 
import ProfileCard from '../components/ProfileCard';
import ProfileModal from '../components/ProfileModal';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../contexts/AuthContexts';

export default function Home() {
  const { logout } = useAuth();
  
  const [perfis, setPerfis] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  
  const [busca, setBusca] = useState('');
  const [filtroArea, setFiltroArea] = useState('');
  const [filtroLocal, setFiltroLocal] = useState('');

  useEffect(() => {
    setPerfis(perfisData);
  }, []);

  const perfisFiltrados = useMemo(() => {
    return perfis
      .filter(p => {
        return filtroArea === '' ? true : p.area === filtroArea;
      })
      .filter(p => {
        return filtroLocal === '' ? true : p.localizacao.includes(filtroLocal);
      })
      .filter(p => {
        if (busca === '') return true;
        const buscaLower = busca.toLowerCase();
        
        return (
          p.nome.toLowerCase().includes(buscaLower) ||
          p.cargo.toLowerCase().includes(buscaLower) ||
          p.habilidadesTecnicas.some(skill => skill.toLowerCase().includes(buscaLower))
        );
      });
  }, [perfis, busca, filtroArea, filtroLocal]);

  const handleCardClick = (perfil) => {
    setSelectedProfile(perfil);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProfile(null);
  };
  
  const handleRecomendar = (nome) => {
    alert(`Você recomendou ${nome}!`);
  };

  const handleMensagem = (nome) => {
    alert(`Abrindo chat com ${nome}...`);
  };

  const areasUnicas = useMemo(() => [...new Set(perfis.map(p => p.area))], [perfis]);
  const locaisUnicos = useMemo(() => [...new Set(perfis.map(p => p.localizacao.split('/')[1]?.trim()).filter(Boolean))], [perfis]);


  return (
    <div className="min-h-screen bg-gray-50"> 
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">PROFISSIONAIS</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
          Sair
        </button>
      </header>

      <SearchBar 
        onBuscaChange={setBusca}
        onAreaChange={setFiltroArea}
        onLocalChange={setFiltroLocal}
        areas={areasUnicas}
        locais={locaisUnicos}
      />

      <main className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {perfisFiltrados.map(perfil => (
          <ProfileCard 
            key={perfil.id} 
            perfil={perfil} 
            onCardClick={handleCardClick} 
          />
        ))}
      </main>

      {modalOpen && selectedProfile && (
        <ProfileModal 
          perfil={selectedProfile} 
          onClose={handleCloseModal}
          onRecomendar={handleRecomendar}
          onMensagem={handleMensagem}
        />
      )}
    </div>
  );
}