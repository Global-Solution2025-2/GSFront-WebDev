export default function ProfileCard({ perfil, onCardClick }) {
  
  return (
    <div 
      className="bg-white shadow rounded-lg p-4 cursor-pointer hover:shadow-lg"
      onClick={() => onCardClick(perfil)}
    >
      <img src={perfil.foto} alt={perfil.nome} className="w-24 h-24 rounded-full mx-auto" />
      <h3 className="text-lg font-bold text-center mt-2">{perfil.nome}</h3>
      <p className="text-sm text-gray-600 text-center">{perfil.cargo}</p>
      <p className="text-xs text-gray-500 text-center mt-1">{perfil.localizacao}</p>
      <div className="mt-2 text-center">
        {perfil.habilidadesTecnicas.slice(0, 3).map(skill => (
          <span key={skill} className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}