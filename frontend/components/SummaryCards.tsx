import {
  Ruler,
  Wrench,
  CircleDot,
  Settings2,
} from "lucide-react";

import { Summary } from "@/types/mto";

interface Props {
  summary: Summary;
}

export default function SummaryCards({ summary }: Props) {

  const cards = [
    {
      title: "Pipe Length",
      value: `${summary.total_pipe_length_m} m`,
      icon: Ruler,
      color: "bg-blue-500",
    },
    {
      title: "Valves",
      value: summary.valves,
      icon: CircleDot,
      color: "bg-green-500",
    },
    {
      title: "Flanges",
      value: summary.flanges,
      icon: Settings2,
      color: "bg-purple-500",
    },
    {
      title: "Fittings",
      value: summary.fittings,
      icon: Wrench,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        📊 Extraction Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => {

          const Icon = card.icon;

          return (

            <div
              key={card.title}
              className="
                bg-white
                rounded-3xl
                shadow-lg
                border
                border-slate-200
                p-6
                transition-all
                duration-300
                hover:shadow-2xl
                hover:-translate-y-2
              "
            >

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-slate-500 font-medium">
                    {card.title}
                  </p>

                  <h3 className="text-4xl font-bold mt-3 text-slate-800">
                    {card.value}
                  </h3>

                </div>

                <div
                  className={`
                    ${card.color}
                    h-14
                    w-14
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    text-white
                  `}
                >
                  <Icon size={30} />
                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}