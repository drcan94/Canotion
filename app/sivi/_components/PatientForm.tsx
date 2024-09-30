"use client";

import React, { useState, useEffect } from "react";

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

interface PatientFormProps {
  onSubmit: (patientData: PatientData) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit }) => {
  const [patientData, setPatientData] = useState<PatientData>({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    fastingHours: "",
    surgicalRiskFactor: "",
    surgeryStart: "",
    initialUrineOutput: "",
    aspiratorFluidVolume: "",
  });

  useEffect(() => {
    const {
      name,
      age,
      gender,
      weight,
      height,
      fastingHours,
      surgicalRiskFactor,
      surgeryStart,
      initialUrineOutput,
      aspiratorFluidVolume,
    } = patientData;

    const allFieldsFilled =
      name &&
      age !== "" &&
      gender &&
      weight !== "" &&
      height !== "" &&
      fastingHours !== "" &&
      surgicalRiskFactor !== "" &&
      surgeryStart &&
      initialUrineOutput !== "" &&
      aspiratorFluidVolume !== "";

    if (allFieldsFilled) {
      onSubmit(patientData);
    }
  }, [patientData, onSubmit]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateNumberInput = (value: string) => {
    if (value === "" || !isNaN(Number(value))) {
      return true;
    } else {
      alert("Lütfen geçerli bir sayı giriniz.");
      return false;
    }
  };

  return (
    <form className="space-y-4 max-w-lg mx-auto">
      <div>
        <label className="block text-lg font-medium mb-1">Hasta Adı:</label>
        <input
          type="text"
          name="name"
          value={patientData.name}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Hasta adını giriniz"
          required
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-1">Cinsiyet:</label>
        <select
          name="gender"
          value={patientData.gender}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded w-full"
          required
        >
          <option value="">Seçiniz</option>
          <option value="male">Erkek</option>
          <option value="female">Kadın</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-lg font-medium mb-1">Yaş:</label>
          <input
            type="text"
            name="age"
            value={patientData.age}
            onChange={(e) => {
              if (validateNumberInput(e.target.value)) {
                handleInputChange(e);
              }
            }}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Yaş"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-1">Kilo (kg):</label>
          <input
            type="text"
            name="weight"
            value={patientData.weight}
            onChange={(e) => {
              if (validateNumberInput(e.target.value)) {
                handleInputChange(e);
              }
            }}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Kilo"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-1">Boy (cm):</label>
          <input
            type="text"
            name="height"
            value={patientData.height}
            onChange={(e) => {
              if (validateNumberInput(e.target.value)) {
                handleInputChange(e);
              }
            }}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Boy"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-1">
            Açlık Süresi (saat):
          </label>
          <input
            type="text"
            name="fastingHours"
            value={patientData.fastingHours}
            onChange={(e) => {
              if (validateNumberInput(e.target.value)) {
                handleInputChange(e);
              }
            }}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Açlık süresi"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-lg font-medium mb-1">
          Cerrahi Risk Faktörü:
        </label>
        <input
          type="text"
          name="surgicalRiskFactor"
          value={patientData.surgicalRiskFactor}
          onChange={(e) => {
            if (validateNumberInput(e.target.value)) {
              handleInputChange(e);
            }
          }}
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Risk faktörü (örn: 5)"
          required
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-1">
          Ameliyat Başlangıç Saati:
        </label>
        <input
          type="time"
          name="surgeryStart"
          value={patientData.surgeryStart}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-1">
          Ameliyat Öncesi İdrar Çıkışı (ml):
        </label>
        <input
          type="text"
          name="initialUrineOutput"
          value={patientData.initialUrineOutput}
          onChange={(e) => {
            if (validateNumberInput(e.target.value)) {
              handleInputChange(e);
            }
          }}
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Ameliyat öncesi idrar çıkışı"
          required
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-1">
          Aspiratördeki Sıvı Miktarı (ml):
        </label>
        <input
          type="text"
          name="aspiratorFluidVolume"
          value={patientData.aspiratorFluidVolume}
          onChange={(e) => {
            if (validateNumberInput(e.target.value)) {
              handleInputChange(e);
            }
          }}
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Aspiratördeki sıvı miktarı"
          required
        />
      </div>
    </form>
  );
};

export default PatientForm;
