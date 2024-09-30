"use client";

import React, { useState, useEffect } from "react";
import PatientForm from "./_components/PatientForm";
import FluidTable from "./_components/FluidTable";

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

interface PatientData {
  name: string;
  age: string;
  gender: "male" | "female" | "";
  weight: string;
  height: string;
  fastingHours: string;
  surgicalRiskFactor: string;
  surgeryStart: string;
  initialUrineOutput: string;
  aspiratorFluidVolume: string;
}

export default function SiviTakip() {
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [adjustedWeight, setAdjustedWeight] = useState<number | null>(null);

  const handleFormSubmit = (data: PatientData) => {
    setPatientData(data);
  };

  useEffect(() => {
    if (!patientData) return;

    // Adjusted Weight Calculation
    const heightInInches = parseFloat(patientData.height) / 2.54;
    let ibw = 0;
    if (patientData.gender === "male") {
      ibw = 50 + 2.3 * (heightInInches - 60);
    } else if (patientData.gender === "female") {
      ibw = 45.5 + 2.3 * (heightInInches - 60);
    }

    const abw = parseFloat(patientData.weight);
    const adjustedWeight = ibw + 0.4 * (abw - ibw);
    setAdjustedWeight(adjustedWeight);

    // Maintenance Fluid Rate (4-2-1 Rule)
    let maintenanceFluidRate = 0;
    if (adjustedWeight <= 10) {
      maintenanceFluidRate = adjustedWeight * 4;
    } else if (adjustedWeight <= 20) {
      maintenanceFluidRate = 40 + (adjustedWeight - 10) * 2;
    } else {
      maintenanceFluidRate = 60 + (adjustedWeight - 20) * 1;
    }

    // Fasting Fluid Deficit
    const fastingDeficit =
      maintenanceFluidRate * parseFloat(patientData.fastingHours);

    // Surgical Risk Fluid (Maintenance)
    const surgicalRiskFluid =
      adjustedWeight * parseFloat(patientData.surgicalRiskFactor);

    // Fluid Distribution
    const firstHourDeficit = fastingDeficit * 0.5;
    const secondHourDeficit = fastingDeficit * 0.25;
    const thirdHourDeficit = fastingDeficit * 0.25;

    const firstHourTotal = firstHourDeficit + surgicalRiskFluid;
    const secondHourTotal = secondHourDeficit + surgicalRiskFluid;
    const thirdHourTotal = thirdHourDeficit + surgicalRiskFluid;
    const subsequentHourTotal = surgicalRiskFluid;

    // Create Table Data
    const newTableData: TableRow[] = [];

    // Starting Hour (Start from one hour after the surgery start time)
    const [startHourStr, startMinuteStr] = patientData.surgeryStart.split(":");
    let currentHour = (parseInt(startHourStr, 10) + 1) % 24;

    // Fluid Requirements and Cumulative Totals
    const fluidRequirements = [
      Math.round(firstHourTotal),
      Math.round(secondHourTotal),
      Math.round(thirdHourTotal),
    ];

    let cumulativeFluidRequirement = 0;

    // First Three Hours
    for (let i = 0; i < 3; i++) {
      const hour = `${currentHour
        .toString()
        .padStart(2, "0")}:${startMinuteStr}`;
      const fluidRequirement = fluidRequirements[i];
      cumulativeFluidRequirement += fluidRequirement;

      // Preserve existing inputs if available
      const existingRow = tableData[i] || {};

      newTableData.push({
        hour,
        fluidRequirement,
        cumulativeFluidRequirement,
        crystalloidCumulative: existingRow.crystalloidCumulative || "",
        colloidCumulative: existingRow.colloidCumulative || "",
        bloodGivenCumulative: existingRow.bloodGivenCumulative || "",
        totalFluidsGivenCumulative: existingRow.totalFluidsGivenCumulative || 0,
        urineOutputCumulative: existingRow.urineOutputCumulative || "",
        bloodLossCumulative: existingRow.bloodLossCumulative || "",
        totalInput: existingRow.totalInput || 0,
        totalOutput: existingRow.totalOutput || 0,
        balance: existingRow.balance || 0,
      });

      currentHour = (currentHour + 1) % 24;
    }

    // Subsequent Hours
    for (let i = 3; i < 12; i++) {
      const hour = `${currentHour
        .toString()
        .padStart(2, "0")}:${startMinuteStr}`;
      const fluidRequirement = Math.round(subsequentHourTotal);
      cumulativeFluidRequirement += fluidRequirement;

      const existingRow = tableData[i] || {};

      newTableData.push({
        hour,
        fluidRequirement,
        cumulativeFluidRequirement,
        crystalloidCumulative: existingRow.crystalloidCumulative || "",
        colloidCumulative: existingRow.colloidCumulative || "",
        bloodGivenCumulative: existingRow.bloodGivenCumulative || "",
        totalFluidsGivenCumulative: existingRow.totalFluidsGivenCumulative || 0,
        urineOutputCumulative: existingRow.urineOutputCumulative || "",
        bloodLossCumulative: existingRow.bloodLossCumulative || "",
        totalInput: existingRow.totalInput || 0,
        totalOutput: existingRow.totalOutput || 0,
        balance: existingRow.balance || 0,
      });

      currentHour = (currentHour + 1) % 24;
    }

    setTableData(newTableData);
  }, [patientData]);

  const recalculateTableData = (data: TableRow[]) => {
    if (!patientData) return data;

    const initialUrineOutput = parseFloat(patientData.initialUrineOutput) || 0;
    const aspiratorFluidVolume =
      parseFloat(patientData.aspiratorFluidVolume) || 0;

    for (let i = 0; i < data.length; i++) {
      const row = data[i];

      const crystalloidCumulative = parseFloat(row.crystalloidCumulative) || 0;
      const colloidCumulative = parseFloat(row.colloidCumulative) || 0;
      const bloodGivenCumulative = parseFloat(row.bloodGivenCumulative) || 0;
      const urineOutputCumulative = parseFloat(row.urineOutputCumulative) || 0;
      const bloodLossCumulative = parseFloat(row.bloodLossCumulative) || 0;

      const netUrineOutput = urineOutputCumulative - initialUrineOutput;
      const netBloodLoss = bloodLossCumulative - aspiratorFluidVolume;

      const totalOutput =
        row.cumulativeFluidRequirement + netUrineOutput + netBloodLoss;
      const totalInput =
        crystalloidCumulative + colloidCumulative + bloodGivenCumulative;

      row.totalFluidsGivenCumulative = totalInput;
      row.totalInput = totalInput;
      row.totalOutput = totalOutput;
      row.balance = totalInput - totalOutput;
    }

    return data;
  };

  const handleTableDataChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newData = [...tableData];
    (newData[index] as any)[field] = value;

    const recalculatedData = recalculateTableData(newData);
    setTableData(recalculatedData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Ameliyat Sırasında Sıvı Takibi
      </h1>
      <PatientForm onSubmit={handleFormSubmit} />
      {adjustedWeight !== null && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">
            Düzeltilmiş Kilo: {adjustedWeight.toFixed(2)} kg
          </p>
        </div>
      )}
      {tableData.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Sıvı Takip Tablosu
          </h2>
          <FluidTable
            tableData={tableData}
            onTableDataChange={handleTableDataChange}
            initialUrineOutput={patientData?.initialUrineOutput || "0"}
            aspiratorFluidVolume={patientData?.aspiratorFluidVolume || "0"}
          />
        </div>
      )}
    </div>
  );
}
