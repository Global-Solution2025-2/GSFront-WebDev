export default function SearchBar({ onBuscaChange, onAreaChange, onLocalChange, areas, locais }) {
  
  return (
    <div className="bg-gray-100 p-4 flex flex-col md:flex-row gap-4">
      <input 
        type="text" 
        placeholder="Buscar por nome, cargo ou skill..."
        onChange={(e) => onBuscaChange(e.target.value)}
        className="border rounded p-2 flex-grow"
      />
      <select onChange={(e) => onAreaChange(e.target.value)} className="border rounded p-2">
        <option value="">Todas as Áreas</option>
        {areas.map(area => <option key={area} value={area}>{area}</option>)}
      </select>
      <select onChange={(e) => onLocalChange(e.target.value)} className="border rounded p-2">
        <option value="">Todos os Estados</option>
        {locais.map(local => <option key={local} value={local}>{local}</option>)}
      </select>
    </div>
  );
}