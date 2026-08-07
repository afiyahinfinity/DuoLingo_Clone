const integrations = [
  {
    name: "Exchange Rates",
    source: "ExchangeratesAPI",
    endpoint: "/api/integrations/exchange?base=USD&symbols=AED,BDT,SAR,GBP",
    purpose: "Currency education, examples and money tools",
    auth: "Server key",
  },
  {
    name: "Country & Currency",
    source: "REST Countries",
    endpoint: "/api/integrations/countries/BD",
    purpose: "Country, currency, language and timezone metadata",
    auth: "No key",
  },
  {
    name: "Qur'an Source",
    source: "Quran Cloud",
    endpoint: "/api/integrations/quran?ref=2:261",
    purpose: "Read-only source retrieval for reviewed learning content",
    auth: "No key",
  },
];

export default function IntegrationsPage() {
  return (
    <main className="min-h-screen bg-[#F8F3E9] px-5 py-10 text-[#181715]">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ad8633]">
          Afiyah Eight · Connected Learning
        </p>
        <h1 className="mt-3 font-serif text-4xl text-[#003629]">API Integrations</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
          External data is routed through Afiyah-owned server endpoints so provider keys stay private and responses can be governed before they reach the learner experience.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {integrations.map((item) => (
            <article key={item.name} className="rounded-3xl border border-[#eadfcb] bg-white p-5 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#ad8633]">{item.source}</div>
              <h2 className="mt-2 font-serif text-2xl text-[#003629]">{item.name}</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{item.purpose}</p>
              <div className="mt-4 rounded-2xl bg-[#003629] p-3 text-xs text-[#F8F3E9] break-all">{item.endpoint}</div>
              <div className="mt-3 text-xs font-semibold text-neutral-500">{item.auth}</div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-[#d9c18a] bg-[#fffaf0] p-5">
          <h2 className="font-serif text-2xl text-[#003629]">Governance</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Currency and country data are informational. Qur'an retrieval is source access only; interpretation, translation choices and curriculum use remain subject to Afiyah Shariah review.
          </p>
        </div>
      </div>
    </main>
  );
}
