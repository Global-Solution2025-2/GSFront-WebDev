export default function ProfileModal({ perfil, onClose, onRecomendar, onMensagem }) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{perfil.nome}</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
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
              <h4 className="font-bold">Formação</h4>
              {perfil.formacao.map((f, i) => (
                <p key={i} className="text-sm">{f.curso} - {f.instituicao} ({f.ano})</p>
              ))}
            </div>

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

          </div>
        </div>

        <div className="flex justify-end gap-4 p-4 border-t bg-gray-50">
          <button 
            onClick={() => onMensagem(perfil.nome)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Enviar Mensagem
          </button>
          <button 
            onClick={() => onRecomendar(perfil.nome)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Recomendar Profissional
          </button>
        </div>
      </div>
    </div>
  );
}