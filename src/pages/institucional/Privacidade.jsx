import { Link } from 'react-router-dom';
import SEOHead from '../../components/ui/SEOHead';

const lastUpdated = 'maio de 2026';

const summaryItems = [
  {
    label: 'Projeto independente',
    value: 'Não somos casa de apostas',
  },
  {
    label: 'Calculadoras',
    value: 'Cálculos no navegador',
  },
  {
    label: 'Contato',
    value: 'Dados enviados voluntariamente',
  },
  {
    label: 'Transparência',
    value: 'Ads e afiliados identificados',
  },
];

const toc = [
  { href: '#informacoes-coletadas', label: 'Informações coletadas' },
  { href: '#uso-das-informacoes', label: 'Uso das informações' },
  { href: '#cookies', label: 'Cookies' },
  { href: '#publicidade-afiliados', label: 'Publicidade e afiliados' },
  { href: '#links-externos', label: 'Links externos' },
  { href: '#seguranca', label: 'Segurança' },
  { href: '#direitos', label: 'Direitos do usuário' },
  { href: '#menores', label: 'Menores de idade' },
  { href: '#atualizacoes', label: 'Atualizações' },
  { href: '#contato', label: 'Contato' },
];

const internalLinks = [
  { to: '/sobre', label: 'Sobre' },
  { to: '/termos', label: 'Termos' },
  { to: '/afiliados', label: 'Afiliados' },
  { to: '/jogo-responsavel', label: 'Jogo Responsável' },
  { to: '/contato', label: 'Contato' },
];

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'PrivacyPolicy',
    name: 'Política de Privacidade do CalculaBet',
    description: 'Política de privacidade do CalculaBet, plataforma independente de ferramentas e conteúdo educativo para apostas esportivas.',
    url: 'https://calculabet.com.br/privacidade',
    dateModified: '2026-05-11',
    publisher: {
      '@type': 'Organization',
      name: 'CalculaBet',
      url: 'https://calculabet.com.br',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'CalculaBet', item: 'https://calculabet.com.br' },
      { '@type': 'ListItem', position: 2, name: 'Política de Privacidade', item: 'https://calculabet.com.br/privacidade' },
    ],
  },
];

function PolicySection({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 rounded-3xl p-6 sm:p-8" style={{ background: 'rgba(13,13,23,0.72)', border: '1px solid var(--border)', boxShadow: '0 18px 60px rgba(0,0,0,0.22)' }}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--cyan)' }}>
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-5" style={{ color: 'var(--text-1)' }}>{title}</h2>
      <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
        {children}
      </div>
    </section>
  );
}

function CheckItem({ children }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold" style={{ background: 'rgba(34,211,238,0.12)', color: 'var(--cyan)', border: '1px solid rgba(34,211,238,0.22)' }}>✓</span>
      <span>{children}</span>
    </li>
  );
}

export default function Privacidade() {
  return (
    <>
      <SEOHead
        title="Política de Privacidade: transparência, cookies e dados"
        description="Entenda como o CalculaBet trata informações de contato, cookies, analytics, publicidade, links afiliados e direitos de privacidade dos usuários."
        canonical="/privacidade"
        schema={schema}
      />

      <main>
        <section className="relative overflow-hidden border-b" style={{ borderColor: 'var(--border)' }}>
          <div aria-hidden="true" className="absolute inset-0">
            <div
              className="absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.16) 0%, rgba(129,140,248,0.09) 42%, transparent 72%)' }}
            />
            <div
              className="absolute -right-16 bottom-0 h-[380px] w-[380px] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.09) 0%, transparent 68%)' }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-center">
              <div>
                <span className="badge badge-cyan mb-5">Privacidade · Transparência · Confiança</span>
                <h1
                  className="font-bold tracking-tight mb-6"
                  style={{ fontSize: 'clamp(2.35rem, 6vw, 4.7rem)', lineHeight: '1.04', letterSpacing: '-0.05em', color: 'var(--text-1)' }}
                >
                  Política de Privacidade clara para uma experiência mais confiável.
                </h1>
                <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-2)', maxWidth: '720px' }}>
                  O CalculaBet é uma plataforma de ferramentas e conteúdo educativo para apostas esportivas. Esta política explica,
                  em linguagem direta, quais informações podem ser tratadas, por que isso acontece e quais escolhas você tem ao navegar pelo site.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#informacoes-coletadas" className="btn-primary px-7 py-3.5">Ler a política</a>
                  <Link to="/contato" className="btn-ghost px-7 py-3.5">Falar conosco</Link>
                </div>
              </div>

              <aside
                className="rounded-3xl p-5 sm:p-6"
                style={{ background: 'rgba(13,13,23,0.86)', border: '1px solid var(--border)', boxShadow: '0 24px 90px rgba(0,0,0,0.36)' }}
                aria-label="Resumo de privacidade"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--text-3)' }}>Resumo rápido</p>
                <div className="space-y-3">
                  {summaryItems.map(item => (
                    <div key={item.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid var(--border)' }}>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{item.label}</p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.10), rgba(129,140,248,0.08))', border: '1px solid rgba(34,211,238,0.18)' }}>
                  <p className="text-sm font-semibold text-white">Última atualização</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>{lastUpdated}</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <nav className="rounded-3xl p-5" style={{ background: 'rgba(13,13,23,0.64)', border: '1px solid var(--border)' }} aria-label="Sumário da política de privacidade">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: 'var(--text-3)' }}>Nesta página</p>
                <ul className="space-y-1">
                  {toc.map(item => (
                    <li key={item.href}>
                      <a href={item.href} className="block rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/5" style={{ color: 'var(--text-2)' }}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="space-y-6">
              <div className="rounded-3xl p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.10), rgba(129,140,248,0.07))', border: '1px solid rgba(34,211,238,0.18)' }}>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  <strong className="text-white">Em resumo:</strong> o CalculaBet não recebe apostas, não administra saldo de usuários e não exige cadastro para usar as calculadoras. Os dados inseridos nas ferramentas são usados para gerar resultados no próprio navegador. Quando você envia uma mensagem pelo formulário de contato, os dados informados são usados para responder à solicitação.
                </p>
              </div>

              <PolicySection id="informacoes-coletadas" eyebrow="01" title="Informações coletadas">
                <p>
                  A coleta de informações no CalculaBet é limitada ao que faz sentido para manter o site funcionando, responder contatos e entender a performance da experiência. Não pedimos dados financeiros, documentos pessoais ou informações sensíveis para utilizar as calculadoras.
                </p>
                <ul className="space-y-3">
                  <CheckItem><strong className="text-white">Dados enviados voluntariamente:</strong> nome, e-mail e mensagem informados pelo usuário no formulário oficial de contato, processado via FormSubmit.</CheckItem>
                  <CheckItem><strong className="text-white">Dados básicos de navegação:</strong> páginas acessadas, origem aproximada da visita, horários de acesso e interações gerais que possam ser registradas por ferramentas técnicas ou de análise.</CheckItem>
                  <CheckItem><strong className="text-white">Cookies:</strong> pequenos arquivos usados para lembrar preferências, medir uso do site, apoiar publicidade ou permitir recursos técnicos.</CheckItem>
                  <CheckItem><strong className="text-white">Analytics:</strong> o site pode utilizar ferramentas de análise no futuro para compreender audiência, desempenho e problemas de navegação, sempre com finalidade estatística e de melhoria.</CheckItem>
                  <CheckItem><strong className="text-white">Informações técnicas:</strong> tipo de navegador, sistema operacional, dispositivo, resolução de tela, endereço IP aproximado e dados necessários para segurança, logs e funcionamento técnico.</CheckItem>
                </ul>
              </PolicySection>

              <PolicySection id="uso-das-informacoes" eyebrow="02" title="Como usamos as informações">
                <p>
                  As informações tratadas são usadas de forma proporcional aos recursos oferecidos pelo site. Nosso objetivo é manter uma experiência rápida, segura, educativa e transparente.
                </p>
                <ul className="space-y-3">
                  <CheckItem>Responder mensagens enviadas pelo formulário de contato.</CheckItem>
                  <CheckItem>Melhorar a navegação, o conteúdo e a usabilidade das calculadoras.</CheckItem>
                  <CheckItem>Analisar performance, carregamento de páginas, erros técnicos e métricas agregadas de uso.</CheckItem>
                  <CheckItem>Proteger o site contra abuso, spam, acessos automatizados indevidos e incidentes de segurança.</CheckItem>
                  <CheckItem>Permitir o funcionamento técnico de integrações, anúncios, links externos e eventuais ferramentas de analytics.</CheckItem>
                </ul>
              </PolicySection>

              <PolicySection id="cookies" eyebrow="03" title="Cookies e tecnologias semelhantes">
                <p>
                  Cookies são pequenos arquivos armazenados no navegador para reconhecer preferências, medir desempenho ou permitir recursos técnicos. O CalculaBet pode utilizar cookies próprios ou de terceiros de acordo com os recursos ativos no site.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    ['Funcionais', 'Apoiam recursos básicos, estabilidade, preferências e funcionamento da interface.'],
                    ['Analytics', 'Podem ajudar a entender visitas, páginas mais acessadas, performance e pontos de melhoria.'],
                    ['Anúncios', 'Podem ser usados por parceiros para medir campanhas, limitar frequência e exibir publicidade relevante.'],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
                      <h3 className="font-semibold mb-2 text-white">{title}</h3>
                      <p className="text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
                <p>
                  Você pode bloquear, apagar ou gerenciar cookies diretamente nas configurações do navegador. Ao restringir cookies, algumas funções, medições ou preferências podem não operar da forma esperada.
                </p>
              </PolicySection>

              <PolicySection id="publicidade-afiliados" eyebrow="04" title="Publicidade e links afiliados">
                <p>
                  Para manter ferramentas gratuitas e conteúdo educativo, o CalculaBet pode exibir anúncios, conteúdos patrocinados ou links de afiliados. Alguns links para parceiros podem gerar comissão ao CalculaBet quando o usuário realiza uma ação qualificada, como cadastro ou contratação em um site externo.
                </p>
                <div className="rounded-2xl p-5" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.22)' }}>
                  <p className="text-sm sm:text-base" style={{ color: '#fcd34d' }}>
                    Essa comissão não altera o custo para o usuário e não transforma o CalculaBet em casa de apostas. Parceiros comerciais, anunciantes e plataformas externas possuem suas próprias políticas de privacidade, cookies, termos e critérios de tratamento de dados.
                  </p>
                </div>
                <p>
                  Sempre que possível, buscamos sinalizar relações comerciais de forma clara para preservar independência editorial e confiança do usuário.
                </p>
              </PolicySection>

              <PolicySection id="links-externos" eyebrow="05" title="Links externos">
                <p>
                  O site pode conter links para casas de apostas, ferramentas, artigos, plataformas de anúncio, parceiros afiliados e outros sites de terceiros. Ao clicar em um link externo, você passa a navegar em ambiente que não é controlado pelo CalculaBet.
                </p>
                <p>
                  Recomendamos revisar a política de privacidade, os termos de uso, as regras de cookies e as práticas de segurança de qualquer site externo antes de fornecer dados ou criar contas.
                </p>
              </PolicySection>

              <PolicySection id="seguranca" eyebrow="06" title="Segurança das informações">
                <p>
                  Adotamos boas práticas razoáveis para reduzir riscos, manter o site estável e proteger informações enviadas voluntariamente. Isso inclui uso de infraestrutura de hospedagem, recursos técnicos e cuidados operacionais compatíveis com a natureza do projeto.
                </p>
                <p>
                  Mesmo assim, nenhuma transmissão online ou sistema conectado à internet é 100% seguro. Por isso, evite enviar informações sensíveis pelo formulário de contato e utilize sempre conexões, dispositivos e navegadores confiáveis.
                </p>
              </PolicySection>

              <PolicySection id="direitos" eyebrow="07" title="Direitos e escolhas do usuário">
                <p>
                  Você pode solicitar esclarecimentos sobre esta política ou pedir a remoção de dados enviados voluntariamente pelo formulário de contato, quando aplicável e tecnicamente possível.
                </p>
                <ul className="space-y-3">
                  <CheckItem>Solicitar a exclusão de mensagens ou dados de contato enviados voluntariamente.</CheckItem>
                  <CheckItem>Entrar em contato para dúvidas sobre privacidade, cookies, anúncios ou links afiliados.</CheckItem>
                  <CheckItem>Gerenciar cookies, permissões e preferências diretamente no navegador utilizado.</CheckItem>
                </ul>
              </PolicySection>

              <PolicySection id="menores" eyebrow="08" title="Menores de idade">
                <p>
                  O CalculaBet é destinado a pessoas maiores de 18 anos. A plataforma oferece conteúdo educativo relacionado a apostas esportivas e não deve ser utilizada por menores de idade.
                </p>
                <p>
                  Não coletamos intencionalmente dados de menores. Caso um responsável identifique envio indevido de informações por menor de idade, poderá solicitar análise e remoção por meio do formulário oficial de contato.
                </p>
              </PolicySection>

              <PolicySection id="atualizacoes" eyebrow="09" title="Atualizações desta política">
                <p>
                  Esta política pode ser atualizada para refletir mudanças na legislação, em recursos do site, em integrações técnicas, em modelos de publicidade, em parcerias afiliadas ou em práticas de segurança.
                </p>
                <p>
                  Quando houver alterações relevantes, a data de atualização será revisada nesta página. Recomendamos consultar esta política periodicamente.
                </p>
              </PolicySection>

              <PolicySection id="contato" eyebrow="10" title="Contato sobre privacidade">
                <p>
                  Para dúvidas, solicitações ou pedidos relacionados à privacidade, utilize exclusivamente o formulário oficial do site. Não exibimos e-mail diretamente nesta página para reduzir spam e preservar a segurança operacional do canal de atendimento.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link to="/contato" className="btn-primary px-6 py-3">Abrir formulário de contato</Link>
                  <Link to="/termos" className="btn-ghost px-6 py-3">Ler termos de uso</Link>
                </div>
              </PolicySection>

              <section className="rounded-3xl p-6 sm:p-8" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }} aria-labelledby="links-relacionados">
                <h2 id="links-relacionados" className="text-xl font-bold mb-4 text-white">Páginas relacionadas</h2>
                <div className="flex flex-wrap gap-3">
                  {internalLinks.map(link => (
                    <Link key={link.to} to={link.to} className="badge hover:border-cyan-400/40 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
