import React from 'react';

interface TableRow {
  hour: string;
  fluidRequirement: number;
  cumulativeFluidRequirement: number;
  crystalloidCumulative: string;
  colloidCumulative: string;
  bloodGivenCumulative: string;
  totalFluidsGivenCumulative: number;
  urineOutputCumulative: string;
  bloodLossCumulative: string;
  totalInput: number;
  totalOutput: number;
  balance: number;
}

interface FluidTableProps {
  tableData: TableRow[];
  onTableDataChange: (index: number, field: string, value: string) => void;
  initialUrineOutput: string;
  aspiratorFluidVolume: string;
}

const FluidTable: React.FC<FluidTableProps> = ({
  tableData,
  onTableDataChange,
  initialUrineOutput,
  aspiratorFluidVolume,
}) => {
  const handleInputChange = (index: number, field: string, value: string) => {
    if (value === '' || !isNaN(parseFloat(value))) {
      onTableDataChange(index, field, value);
    } else {
      alert('Lütfen geçerli bir sayı giriniz.');
    }
  };

  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-500">
          <tr>
            <th className="border border-gray-300 px-2 py-1 text-white" rowSpan={2}>
              Saat
            </th>
            <th className="border border-gray-300 px-2 py-1 text-white" colSpan={4}>
              Çıkan Sıvılar (ml)
            </th>
            <th className="border border-gray-300 px-2 py-1 text-white" colSpan={4}>
              Verilen Sıvılar (ml)
            </th>
            <th className="border border-gray-300 px-2 py-1 text-white" rowSpan={2}>
              Denge (ml)
            </th>
          </tr>
          <tr>
            {/* Çıkan Sıvılar */}
            <th className="border border-gray-300 px-2 py-1 text-white">
              İhtiyaç Kümülatif
            </th>
            <th className="border border-gray-300 px-2 py-1 text-white">
              Kanama Kümülatif
            </th>
            <th className="border border-gray-300 px-2 py-1 text-white">
              İdrar Kümülatif
            </th>
            <th className="border border-gray-300 px-2 py-1 text-white">Toplam Çıkan</th>
            {/* Verilen Sıvılar */}
            <th className="border border-gray-300 px-2 py-1 text-white">
              Kristalloid Kümülatif
            </th>
            <th className="border border-gray-300 px-2 py-1 text-white">
              Kolloid Kümülatif
            </th>
            <th className="border border-gray-300 px-2 py-1 text-white">
              Kan Kümülatif
            </th>
            <th className="border border-gray-300 px-2 py-1 text-white">Toplam Verilen</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => {
            const initialUrine = parseFloat(initialUrineOutput) || 0;
            const initialBloodLoss = parseFloat(aspiratorFluidVolume) || 0;

            const netUrineOutput =
              (parseFloat(row.urineOutputCumulative) || 0) - initialUrine;
            const netBloodLoss =
              (parseFloat(row.bloodLossCumulative) || 0) - initialBloodLoss;

            const totalOutput =
              row.cumulativeFluidRequirement + netUrineOutput + netBloodLoss;
            const totalInput =
              (parseFloat(row.crystalloidCumulative) || 0) +
              (parseFloat(row.colloidCumulative) || 0) +
              (parseFloat(row.bloodGivenCumulative) || 0);

            row.totalInput = totalInput;
            row.totalOutput = totalOutput;
            row.balance = totalInput - totalOutput;

            return (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-2 py-1">{row.hour}</td>

                {/* Çıkan Sıvılar */}
                <td className="border border-gray-300 px-2 py-1">
                  {row.cumulativeFluidRequirement}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={row.bloodLossCumulative}
                    onChange={(e) =>
                      handleInputChange(index, 'bloodLossCumulative', e.target.value)
                    }
                    className="border border-gray-300 p-1 rounded w-full"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={row.urineOutputCumulative}
                    onChange={(e) =>
                      handleInputChange(index, 'urineOutputCumulative', e.target.value)
                    }
                    className="border border-gray-300 p-1 rounded w-full"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {totalOutput.toFixed(2)}
                </td>

                {/* Verilen Sıvılar */}
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={row.crystalloidCumulative}
                    onChange={(e) =>
                      handleInputChange(index, 'crystalloidCumulative', e.target.value)
                    }
                    className="border border-gray-300 p-1 rounded w-full"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={row.colloidCumulative}
                    onChange={(e) =>
                      handleInputChange(index, 'colloidCumulative', e.target.value)
                    }
                    className="border border-gray-300 p-1 rounded w-full"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="text"
                    value={row.bloodGivenCumulative}
                    onChange={(e) =>
                      handleInputChange(index, 'bloodGivenCumulative', e.target.value)
                    }
                    className="border border-gray-300 p-1 rounded w-full"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  {totalInput.toFixed(2)}
                </td>

                {/* Denge */}
                <td className="border border-gray-300 px-2 py-1">
                  {row.balance > 0 ? '+' : ''}
                  {row.balance.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FluidTable;
