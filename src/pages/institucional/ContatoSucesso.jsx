import SEOHead from '../../components/ui/SEOHead';

export default function ContatoSucesso() {
  return (
    <>
      <SEOHead
        title="Mensagem recebida"
        description="Sua mensagem foi enviada com sucesso para o CalculaBet pelo formulário oficial de contato."
        canonical="/contato/sucesso"
        noindex
      />

      <section className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="success-heading">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_70%_20%,rgba(129,140,248,0.13),transparent_30%)]" />
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-1 text-center shadow-2xl shadow-black/30 backdrop-blur-2xl">
          <div className="rounded-[1.75rem] bg-[#080811]/88 px-6 py-12 sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-300/10 text-3xl shadow-lg shadow-emerald-950/20" aria-hidden="true">
              ✓
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Envio confirmado</p>
            <h1 id="success-heading" className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Mensagem recebida com sucesso.</h1>
            <p className="mt-5 text-base leading-8 text-gray-300">
              Obrigado por entrar em contato pelo formulário oficial do CalculaBet. Sua mensagem foi encaminhada para análise e poderá receber resposta conforme prioridade e volume de solicitações.
            </p>
            <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <p className="font-semibold text-white">Próximo passo</p>
                <p className="mt-2 text-sm leading-6 text-gray-400">Nossa equipe avaliará o conteúdo enviado com atenção.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <p className="font-semibold text-white">Canal oficial</p>
                <p className="mt-2 text-sm leading-6 text-gray-400">Novas mensagens devem ser enviadas exclusivamente pelo formulário.</p>
              </div>
            </div>
            <a href="/" className="btn-primary mt-8 w-full sm:w-auto">Voltar ao início</a>
          </div>
        </div>
      </section>
    </>
  );
}
