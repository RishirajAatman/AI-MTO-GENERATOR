import { MTOItem } from "@/types/mto";

interface Props {
  items: MTOItem[];
}

export default function MtoTable({ items }: Props) {
  function getCategoryColor(category: string) {
    switch (category.toUpperCase()) {
      case "PIPE":
        return "bg-blue-100 text-blue-700";

      case "FITTING":
        return "bg-orange-100 text-orange-700";

      case "FLANGE":
        return "bg-purple-100 text-purple-700";

      case "VALVE":
        return "bg-green-100 text-green-700";

      case "GASKET":
        return "bg-pink-100 text-pink-700";

      case "BOLT SET":
        return "bg-yellow-100 text-yellow-700";

      case "SUPPORT":
        return "bg-slate-200 text-slate-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function getConfidenceColor(confidence?: number) {
    if (confidence === undefined || confidence === null)
      return "bg-gray-100 text-gray-700";

    if (confidence >= 0.9)
      return "bg-green-100 text-green-700";

    if (confidence >= 0.7)
      return "bg-yellow-100 text-yellow-700";

    return "bg-red-100 text-red-700";
  }

  return (
    <div className="mt-10 bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          📋 Material Take-Off
        </h2>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
          {items.length} Items
        </span>

      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-4 py-3 text-left">Item</th>

              <th className="px-4 py-3 text-left">Category</th>

              <th className="px-4 py-3 text-left">Description</th>

              <th className="px-4 py-3 text-left">Size</th>

              <th className="px-4 py-3 text-left">Qty</th>

              <th className="px-4 py-3 text-left">Material</th>

              <th className="px-4 py-3 text-left">Confidence</th>

            </tr>

          </thead>

          <tbody>

            {items.map((item, index) => (

              <tr
                key={`${item.item_no}-${index}`}
                className="
                  border-t
                  hover:bg-blue-50
                  transition
                  even:bg-slate-50
                "
              >

                <td className="px-4 py-4 font-medium">

                  {item.item_no}

                </td>

                <td className="px-4 py-4">

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-semibold
                      ${getCategoryColor(item.category)}
                    `}
                  >
                    {item.category}
                  </span>

                </td>

                <td className="px-4 py-4">

                  {item.description}

                </td>

                <td className="px-4 py-4">

                  {item.size_nps || "-"}

                </td>

                <td className="px-4 py-4">

                  {item.quantity}

                </td>

                <td className="px-4 py-4">

                  {item.material_spec || "-"}

                </td>

                <td className="px-4 py-4">

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-semibold
                      ${getConfidenceColor(item.confidence)}
                    `}
                  >
                    {item.confidence
                      ? `${Math.round(item.confidence * 100)}%`
                      : "-"}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}