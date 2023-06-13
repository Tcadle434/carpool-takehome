import React from "react";
import { useRouter } from "next/router";

interface Data {
  treeAuthority: string;
  transferCount: number;
}

interface DataTableProps {
  data: Data[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const router = useRouter();

  const handleRowClick = (treeAuthority: string) => {
    router.push(`/instructions/${encodeURIComponent(treeAuthority)}`);
  };

  return (
    <table className="divide-y divide-gray-100">
      <thead className="bg-zinc">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200"
          >
            Tree Authority Account
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200"
          >
            Number of Transfers (24 hrs)
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-zinc-800 text-white">
        {data.map((item, index) => (
          <tr
            key={index}
            className="cursor-pointer font-mono transition-colors duration-300 hover:bg-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
            onClick={() => {
              handleRowClick(item.treeAuthority);
            }}
          >
            <td className="whitespace-nowrap px-6 py-4">
              {item.treeAuthority}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              {item.transferCount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
