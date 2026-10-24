import React from 'react';
import { Bot, Send, Sparkles, X } from 'lucide-react';

type Message = { role: 'assistant' | 'user'; text: string };

const answers = [
  { keys: ['vaccine', 'immun', 'shot'], text: 'The app keeps immunisation history and highlights upcoming doses so families and care teams can stay on schedule.' },
  { keys: ['growth', 'height', 'weight'], text: 'Growth measurements can be tracked over time, helping care teams spot changes early and discuss them with families.' },
  { keys: ['appointment', 'visit', 'doctor'], text: 'Appointments, visit notes, referrals, and care-team updates can live in one continuous child health record.' },
  { keys: ['privacy', 'safe', 'security'], text: 'This demonstration uses fictional records. In a production system, access would be role-based and health information would be protected.' },
  { keys: ['worker', 'health worker', 'clinic'], text: 'Health workers can capture measurements, immunisations, referrals, and notes during visits, including when connectivity is limited.' },
];

function getAnswer(question: string) {
  const normalized = question.toLowerCase();
  const match = answers.find(({ keys }) => keys.some((key) => normalized.includes(key)));
  return match?.text ?? 'I can help explain immunisations, growth tracking, appointments, privacy, and how the platform supports care teams.';
}

export const HealthChatbot: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>([
    { role: 'assistant', text: 'Hi, I’m the NCHT guide. Ask me about child health tracking or how the platform supports care teams.' },
  ]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    setMessages((current) => [...current, { role: 'user', text: question }, { role: 'assistant', text: getAnswer(question) }]);
    setInput('');
  };

  return <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
    {open && <section aria-label="NCHT health questions chatbot" className="mb-3 flex h-[min(520px,calc(100vh-110px))] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[#17251f]/15 bg-[#f4f5f0] shadow-2xl">
      <header className="flex items-center justify-between bg-[#17251f] px-5 py-4 text-[#f4f5f0]"><div className="flex items-center gap-3"><span className="rounded-xl bg-[#9ce477] p-2 text-[#17251f]"><Bot /></span><div><h2 className="text-sm font-bold">NCHT guide</h2><p className="text-xs text-white/60">Ask a health question</p></div></div><button onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-white/10" aria-label="Close chatbot"><X /></button></header>
      <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><p className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${message.role === 'user' ? 'rounded-br-sm bg-[#43852e] text-white' : 'rounded-bl-sm bg-[#dce9d7] text-[#17251f]'}`}>{message.text}</p></div>)}</div>
      <form onSubmit={submit} className="border-t border-[#17251f]/10 p-3"><label htmlFor="health-question" className="sr-only">Ask a health question</label><div className="flex items-center gap-2 rounded-xl border border-[#17251f]/15 bg-white px-3 py-1"><input id="health-question" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about immunisations..." className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none" /><button type="submit" className="rounded-lg bg-[#17251f] p-2 text-white transition hover:bg-[#43852e]" aria-label="Send question"><Send /></button></div></form>
    </section>}
    <button onClick={() => setOpen((current) => !current)} className="flex items-center gap-2 rounded-full bg-[#9ce477] px-4 py-3 text-sm font-bold text-[#17251f] shadow-xl transition hover:bg-[#b9f398]" aria-expanded={open} aria-controls="health-question"><Sparkles /> Ask NCHT</button>
  </div>;
};
