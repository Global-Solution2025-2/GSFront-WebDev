export default function SearchBar({
  onBuscaChange,
  onAreaChange,
  onLocalChange,
  areas,
  locais,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:bg-slate-900/90 dark:border-slate-700">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Busca
          </label>
          <input
            type="text"
            placeholder="Buscar por nome, cargo ou skill..."
            onChange={e => onBuscaChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none ring-blue-500/60 focus:bg-white focus:ring-2 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-50"
          />
        </div>

        <div className="w-full md:w-56">
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Área
          </label>
          <select
            onChange={e => onAreaChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none ring-blue-500/60 focus:bg-white focus:ring-2 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-50"
          >
            <option value="">Todas as áreas</option>
            {areas.map(area => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-56">
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Estado
          </label>
          <select
            onChange={e => onLocalChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none ring-blue-500/60 focus:bg-white focus:ring-2 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-50"
          >
            <option value="">Todos os estados</option>
            {locais.map(local => (
              <option key={local} value={local}>
                {local}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}
