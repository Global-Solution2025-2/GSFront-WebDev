export default function ProfileCard({ perfil, onCardClick }) {
  return (
    <button
      type="button"
      onClick={() => onCardClick(perfil)}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-blue-500/70 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-slate-900 dark:border-slate-700"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px]">
            <img
              src={perfil.foto}
              alt={perfil.nome}
              className="h-full w-full rounded-full object-cover bg-slate-100"
            />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 line-clamp-1 dark:text-slate-50">
            {perfil.nome}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-1 dark:text-slate-400">
            {perfil.cargo}
          </p>
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
            {perfil.localizacao}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {perfil.habilidadesTecnicas.slice(0, 3).map(skill => (
          <span
            key={skill}
            className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-200"
          >
            {skill}
          </span>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-slate-500 line-clamp-2 dark:text-slate-400">
        {perfil.resumo}
      </p>
    </button>
  )
}
