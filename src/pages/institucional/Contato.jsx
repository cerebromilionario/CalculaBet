import { useState } from 'react';
import SEOHead from '../../components/ui/SEOHead';

export default function Contato() {
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({ nome: '', email: '', assunto: '', mensagem: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <>
      <SEOHead title="Contato" description="Entre em contato com o CalculaBet para dúvidas, sugestões ou parcerias." canonical="/contato" />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Contato</h1>
        <p className="text-gray-400 mb-8">Dúvidas, sugestões, erros em calculadoras ou interesse em parcerias? Entre em contato.</p>

        {enviado ? (
          <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-xl p-6 text-center">
            <p className="text-2xl mb-2">✅</p>
            <h2 className="font-bold text-white mb-2">Mensagem enviada!</h2>
            <p className="text-gray-400 text-sm">Responderemos em até 2 dias úteis.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 card">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Nome</label>
                <input type="text" required className="input-field" placeholder="Seu nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
              </div>
              <div>
                <label className="label">E-mail</label>
                <input type="email" required className="input-field" placeholder="seu@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="label">Assunto</label>
              <select className="input-field" value={form.assunto} onChange={e => setForm({ ...form, assunto: e.target.value })}>
                <option value="">Selecione...</option>
                <option>Dúvida sobre calculadora</option>
                <option>Reportar erro</option>
                <option>Parceria / Afiliação</option>
                <option>Imprensa</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <label className="label">Mensagem</label>
              <textarea required rows={5} className="input-field resize-none" placeholder="Descreva sua dúvida ou sugestão..." value={form.mensagem} onChange={e => setForm({ ...form, mensagem: e.target.value })} />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">Enviar mensagem</button>
          </form>
        )}
      </div>
    </>
  );
}
