import {
  FileText,
  GitBranch,
  Hash,
  Layers,
  Ruler,
  Briefcase,
} from "lucide-react";

import { DrawingMeta } from "@/types/mto";

interface Props {
  meta: DrawingMeta;
}

export default function MetadataCard({ meta }: Props) {
  const fields = [
    {
      label: "Drawing Number",
      value: meta.drawing_no || "Not Available",
      icon: FileText,
    },
    {
      label: "Revision",
      value: meta.revision || "Not Available",
      icon: GitBranch,
    },
    {
      label: "Line Number",
      value: meta.line_number || "Not Available",
      icon: Hash,
    },
    {
      label: "Material Class",
      value: meta.material_class || "Not Available",
      icon: Layers,
    },
    {
      label: "NPS",
      value: meta.nps || "Not Available",
      icon: Ruler,
    },
    {
      label: "Service",
      value: meta.service || "Not Available",
      icon: Briefcase,
    },
  ];

  return (
    <div className="mt-10 bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        📄 Drawing Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {fields.map((field) => {

          const Icon = field.icon;

          return (

            <div
              key={field.label}
              className="
                flex
                items-center
                gap-4
                bg-slate-50
                rounded-2xl
                p-5
                border
                border-slate-200
              "
            >

              <div className="bg-blue-100 p-3 rounded-xl">

                <Icon
                  className="text-blue-600"
                  size={22}
                />

              </div>

              <div>

                <p className="text-sm text-slate-500">

                  {field.label}

                </p>

                <p className="font-semibold text-slate-800">

                  {field.value}

                </p>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}