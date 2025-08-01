import { useState } from "react";
import {
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaCalendar,
} from "react-icons/fa";
import { Transition } from "@headlessui/react";

export default function Calculo() {
  const [funcionarios, setFuncionarios] = useState("");
  const [salario, setSalario] = useState("");
  const [show, setShow] = useState(true);

  const dollar = 6.0; // Valor do dólar para conversão, pode ser dinâmico
  const custoFirewall = [
    { nome: "Fortigate 40F", custo: 473.75, funcionarios: 50 },
    { nome: "Fortigate 60F", custo: 665.17, funcionarios: 150 },
    { nome: "Fortigate 80F", custo: 1464.32, funcionarios: 300 },
  ];

  const valorHora =
    funcionarios && salario
      ? (parseFloat(salario) / 220) * parseInt(funcionarios)
      : 0;

  const semanal = valorHora * 8;
  const mensal = semanal * 4;
  const anual = mensal * 12;

  const formatBRL = (valor) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="min-h-screen w-full bg-slate-900 px-4">
      <div className="w-full max-w-3xl mx-auto py-10 px-6 rounded-2xl shadow-xl bg-slate-800 border border-slate-700 mt-10">
        <header className="mb-8 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-red-500 mb-2 tracking-tight font-sans">
            Horas Improdutivas
          </h1>
          <p className="text-center text-base text-slate-300 max-w-xl font-light">
            Descubra o custo das horas improdutivas da sua equipe de forma
            simples e visual.
          </p>
        </header>
        <form
          className="w-full bg-slate-700 rounded-xl p-6 mb-10 flex flex-col md:flex-row gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex-1 flex flex-col gap-2">
            <label
              className="text-slate-200 text-lg font-semibold text-center md:text-left"
              htmlFor="funcionarios"
            >
              Funcionários
            </label>
            <input
              id="funcionarios"
              type="number"
              min="0"
              value={funcionarios}
              onChange={(e) => setFuncionarios(e.target.value)}
              placeholder="Ex: 10"
              className="w-full px-4 py-4 rounded-lg border-none bg-slate-800 text-slate-100 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-red-500 transition placeholder:text-slate-400"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label
              className="text-slate-200 text-lg font-semibold text-center md:text-left"
              htmlFor="salario"
            >
              Salário Médio (R$)
            </label>
            <input
              id="salario"
              type="number"
              min="0"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
              placeholder="Ex: 2000"
              className="w-full px-4 py-4 rounded-lg border-none bg-slate-800 text-slate-100 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-red-500 transition placeholder:text-slate-400"
            />
          </div>
        </form>
        <Transition
          show={show}
          appear
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MinimalCard
              icon={<FaCalendarDay size={28} />}
              label="Diário"
              value={formatBRL(valorHora)}
            />
            <MinimalCard
              icon={<FaCalendarWeek size={28} />}
              label="Semanal"
              value={formatBRL(semanal)}
            />
            <MinimalCard
              icon={<FaCalendarAlt size={28} />}
              label="Mensal"
              value={formatBRL(mensal)}
            />
            <MinimalCard
              icon={<FaCalendar size={28} />}
              label="Anual"
              value={formatBRL(anual)}
            />
          </section>
        </Transition>
      </div>
      <div className="w-full max-w-3xl mx-auto py-10 px-6 rounded-2xl shadow-xl bg-slate-800 border border-slate-700 mt-5">
        {funcionarios && salario && custoFirewall.length > 0 ? (
          (() => {
            const firewallSelecionado =
              custoFirewall.find((fw) => funcionarios <= fw.funcionarios) ||
              custoFirewall[custoFirewall.length - 1];

            const investimento = firewallSelecionado.custo * dollar;
            const economiaDiaria = semanal / 5;
            const economiaSemanal = semanal - (investimento / 52)
            const economiaMensal = mensal - (investimento / 12);
            const economiaAnual = anual - investimento;

            return (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-white">
                  Firewall recomendado: {firewallSelecionado.nome}
                </h2>
                <h2 className="text-xl font-bold text-red-400 mb-2">
                  Investimento: {formatBRL(investimento)}<br/>
                </h2>
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <EconomyCard
                    icon={<FaCalendarDay size={24} />}
                    label="Diária"
                    value={economiaDiaria}
                  />
                  <EconomyCard
                    icon={<FaCalendarWeek size={24} />}
                    label="Semanal"
                    value={economiaSemanal}
                  />
                  <EconomyCard
                    icon={<FaCalendarAlt size={24} />}
                    label="Mensal"
                    value={economiaMensal}
                  />
                  <EconomyCard
                    icon={<FaCalendar size={24} />}
                    label="Anual"
                    value={economiaAnual}
                  />
                </section>
              </div>
            );
          })()
        ) : (
          <span className="text-slate-400">
            Preencha o número de funcionários para ver o investimento e
            economia.
          </span>
        )}
      </div>
    </div>
  );
}

function MinimalCard({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl border border-slate-700 bg-slate-700 shadow transition hover:shadow-lg">
      <div className="mb-2 flex items-center justify-center w-12 h-12 rounded bg-slate-800 text-red-500">
        {icon}
      </div>
      <span className="text-slate-200 text-base font-semibold">{label}</span>
      <div className="text-lg font-bold text-red-400">{value}</div>
    </div>
  );
}

function EconomyCard({ label, value, icon }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl border border-slate-700 bg-slate-700 shadow transition hover:shadow-lg">
      <div className="mb-2 flex items-center justify-center w-12 h-12 rounded bg-slate-800 text-red-500">
        {icon}
      </div>
      <span className="text-slate-200 text-base font-semibold">{label}</span>
      <div
        className={`text-lg font-bold ${
          value > 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {value >= 0
          ? `Economia: ${value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}`
          : `Custo: ${Math.abs(value).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}`}
      </div>
    </div>
  );
}
