import React, { useState } from "react";
import { useRouter } from "next/router";
import { InstructionDataType } from "~/lib/types";

interface InstructionTableProps {
  data: InstructionDataType[];
}

const InstructionTable: React.FC<InstructionTableProps> = ({ data }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const router = useRouter();

  const handleRowClick = (index: number) => {
    setExpandedRow(index === expandedRow ? null : index);
  };

  function truncateTxSignature(txSignature: string) {
    if (txSignature.length <= 20) {
      return txSignature;
    } else {
      return txSignature.substr(0, 20) + "...";
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full divide-y divide-gray-100">
        <thead className="bg-zinc">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200">
              Tx Signature
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200">
              Instruction Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200">
              Slot
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200">
              Time
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-zinc-800 text-white">
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <tr
                className="cursor-pointer font-mono transition-colors duration-300 hover:bg-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                onClick={() => handleRowClick(index)}
              >
                <td className="whitespace-nowrap px-6 py-4">
                  {truncateTxSignature(item.txSignature)}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
                <td className="whitespace-nowrap px-6 py-4">{item.slot}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {item.timestamp}
                </td>
              </tr>
              {expandedRow === index && (
                <tr>
                  <td colSpan={4} className="bg-black p-4">
                    <pre>{JSON.stringify(item, null, 2)}</pre>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstructionTable;
