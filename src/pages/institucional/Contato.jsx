import { useMemo, useState } from 'react';
import SEOHead from '../../components/ui/SEOHead';

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/Willianzacarias77@gmail.com';
const SUCCESS_URL = 'https://calculabet.site/contato/sucesso';
const MESSAGE_LIMIT = 1200;

const cleanValue = (value) => value.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();

export default function Contato() {
  const [form, setForm] = useState({ nome: '', email: '', assunto: '', mensagem: '', website: '' });
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const messageCount = form.mensagem.length;
  const progress = useMemo(() => Math.min((messageCount / MESSAGE_LIMIT) * 100, 100), [messageCount]);

  const updateField = (field, value) => {
    const nextValue = field === 'mensagem' ? value.slice(0, MESSAGE_LIMIT) : value;
    setForm((current) => ({ ...current, [field]: nextValue }));

    if (status !== 'idle') {
      setStatus('idle');
      setStatusMessage('');
    }
  };

  const handleSubmit = (event) => {
    const sanitizedForm = {
      nome: cleanValue(form.nome),
      email: cleanValue(form.email),
      assunto: cleanValue(form.assunto),
      mensagem: form.mensagem.replace(/[<>]/g, '').trim(),
      website: form.website,
    };

    if (sanitizedForm.website) {
      event.preventDefault();
      setStatus('error');
      setStatusMessage('Não foi possível enviar a mensagem. Recarregue a página e tente novamente.');
      return;
    }

    if (!sanitizedForm.nome || !sanitizedForm.email || !sanitizedForm.assunto || !sanitizedForm.mensagem) {
      event.preventDefault();
      setForm(sanitizedForm);
      setStatus('error');
      setStatusMessage('Preencha todos os campos obrigatórios antes de enviar.');
      return;
    }

    event.currentTarget.elements.nome.value = sanitizedForm.nome;
    event.currentTarget.elements.email.value = sanitizedForm.email;
    event.currentTarget.elements.assunto.value = sanitizedForm.assunto;
    event.currentTarget.elements.mensagem.value = sanitizedForm.mensagem;

    setForm(sanitizedForm);
    setStatus('loading');
    setStatusMessage('Enviando sua mensagem com segurança...');
  };

  return (
    <>
      <SEOHead
        title="Contato oficial"
        description="Fale com o CalculaBet pelo formulário oficial de contato. Envie dúvidas, sugestões e feedbacks com segurança em uma experiência rápida e profissional."
        canonical="/contato"
      />

      <div className="relative isolate overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(129,140,248,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_42%)]" />
        <div className="absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

        <section className="mx-auto max-w-5xl text-center" aria-labelledby="contact-heading">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 shadow-2xl shadow-cyan-950/20 backdrop-blur">
            Canal oficial CalculaBet
          </div>
          <h1 id="contact-heading" className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Fale com a nossa equipe por um canal seguro e profissional.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
            Tem dúvidas, sugestões ou feedback? Entre em contato através do formulário abaixo. Lemos cada mensagem com atenção para evoluir a plataforma com transparência e cuidado.
          </p>
        </section>

        <section className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-start" aria-label="Formulário de contato oficial">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-1 shadow-2xl shadow-black/30 backdrop-blur-2xl">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
            <form
              action={FORMSUBMIT_ENDPOINT}
              method="POST"
              onSubmit={handleSubmit}
              className="relative space-y-6 rounded-[1.75rem] bg-[#080811]/86 p-5 sm:p-8"
            >
              <input type="hidden" name="_subject" value="Novo contato oficial pelo CalculaBet" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={SUCCESS_URL} />
              <input type="text" name="_honey" value={form.website} onChange={(event) => updateField('website', event.target.value)} tabIndex="-1" autoComplete="off" className="sr-only" aria-hidden="true" />

              <div className="flex flex-col gap-2 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-cyan-200">Mensagem direta</p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">Envie sua solicitação</h2>
                </div>
                <p className="text-sm text-gray-400">Todos os campos são obrigatórios.</p>
              </div>

              {statusMessage && (
                <div className={`rounded-2xl border px-4 py-3 text-sm ${status === 'error' ? 'border-red-400/25 bg-red-400/10 text-red-100' : 'border-cyan-300/25 bg-cyan-300/10 text-cyan-100'}`} role="status" aria-live="polite">
                  {statusMessage}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="group">
                  <label htmlFor="nome" className="label">Nome</label>
                  <input id="nome" name="nome" type="text" required autoComplete="name" className="input-field min-h-12 group-hover:border-white/20" placeholder="Seu nome completo" value={form.nome} onChange={(event) => updateField('nome', event.target.value)} />
                </div>
                <div className="group">
                  <label htmlFor="email" className="label">Email</label>
                  <input id="email" name="email" type="email" required autoComplete="email" className="input-field min-h-12 group-hover:border-white/20" placeholder="seu@email.com" value={form.email} onChange={(event) => updateField('email', event.target.value)} />
                </div>
              </div>

              <div className="group">
                <label htmlFor="assunto" className="label">Assunto</label>
                <input id="assunto" name="assunto" type="text" required className="input-field min-h-12 group-hover:border-white/20" placeholder="Ex.: sugestão para uma calculadora" value={form.assunto} onChange={(event) => updateField('assunto', event.target.value)} />
              </div>

              <div className="group">
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <label htmlFor="mensagem" className="label mb-0">Mensagem</label>
                  <span className="text-xs text-gray-500" aria-live="polite">{messageCount}/{MESSAGE_LIMIT}</span>
                </div>
                <textarea id="mensagem" name="mensagem" required rows={7} maxLength={MESSAGE_LIMIT} className="input-field resize-none leading-6 group-hover:border-white/20" placeholder="Conte em detalhes como podemos ajudar. Quanto mais contexto, melhor será nossa análise." value={form.mensagem} onChange={(event) => updateField('mensagem', event.target.value)} />
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5" aria-hidden="true">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-300 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <button type="submit" className="btn-primary min-h-13 w-full rounded-2xl text-base disabled:cursor-wait disabled:opacity-75" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/25 border-t-black" aria-hidden="true" />
                    Enviando com segurança...
                  </>
                ) : (
                  'Enviar mensagem pelo formulário'
                )}
              </button>
              <p className="text-center text-xs leading-5 text-gray-500">
                Ao enviar, você confirma que este é o canal oficial de contato e concorda em receber retorno apenas quando necessário para responder à sua solicitação.
              </p>
            </form>
          </div>

          <aside className="space-y-4" aria-label="Informações institucionais de contato">
            <div className="card-glass p-6 shadow-xl shadow-black/20">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-200">Como funciona</p>
              <h2 className="mt-3 text-2xl font-bold text-white">Contato centralizado para mais segurança.</h2>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                O formulário é o único canal oficial de contato do CalculaBet. Isso ajuda a organizar solicitações, reduzir ruído e manter um histórico claro para análise da equipe.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ['01', 'Tempo de resposta', 'As respostas podem levar algum tempo, especialmente em períodos de maior volume.'],
                ['02', 'Análise cuidadosa', 'Dúvidas, sugestões e feedbacks relevantes são avaliados com prioridade editorial e institucional.'],
                ['03', 'Uso responsável', 'Mensagens abusivas, automações indevidas ou spam podem ser ignoradas sem aviso prévio.'],
              ].map(([number, title, text]) => (
                <div key={number} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.055]">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-sm font-bold text-cyan-200">{number}</div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">{text}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.025] p-6 text-center shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8" aria-label="Compromisso com a comunidade">
          <p className="text-lg font-semibold text-white">Estamos sempre buscando melhorar a plataforma e valorizar o feedback da comunidade.</p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-400">Sua mensagem ajuda o CalculaBet a criar ferramentas mais claras, úteis e responsáveis para quem acompanha apostas esportivas com consciência.</p>
        </section>
      </div>
    </>
  );
}
