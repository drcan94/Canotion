"use client";

import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { jsPDF } from "jspdf";
import fontBase64 from "@/components/font/robotoFontBase64";
const fontName = "Roboto-Regular";

interface IPatient {
  id: number;
  name: string;
  complaints: string;
  examinationFindings: string;
  testsRequested: string;
  testResults: string;
  progressNotes: string;
  entryTime: Date;
}

const InlineEditField: React.FC<{
  text: string;
  onTextChange: (newText: string) => void;
  multiline?: boolean;
}> = ({ text, onTextChange, multiline = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState(text);

  useEffect(() => {
    setEditableText(text);
  }, [text]);

  const handleBlur = () => {
    onTextChange(editableText);
    setIsEditing(false);
  };

  return (
    <div
      onBlur={handleBlur}
      onClick={() => setIsEditing(true)}
      className="inline-block cursor-text w-full"
      style={{ cursor: "text" }}
    >
      {isEditing ? (
        multiline ? (
          <textarea
            autoFocus
            className="border border-gray-300 rounded p-1 w-full"
            value={editableText}
            onChange={(e) => setEditableText(e.target.value)}
          />
        ) : (
          <input
            autoFocus
            type="text"
            className="border border-gray-300 rounded p-1 w-full"
            value={editableText}
            onChange={(e) => setEditableText(e.target.value)}
          />
        )
      ) : (
        <span>{editableText || ""}</span>
      )}
    </div>
  );
};

const PatientAccordion: React.FC<{
  patient: IPatient;
  onUpdate: (updatedPatient: IPatient) => void;
  onDelete: (id: number) => void;
}> = ({ patient, onUpdate, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = (field: keyof IPatient, value: string) => {
    onUpdate({ ...patient, [field]: value });
  };

  return (
    <div className="border border-gray-200 rounded my-2">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-1/2">
          <InlineEditField
            text={patient.name}
            onTextChange={(newText) => handleUpdate("name", newText)}
          />
        </div>
        <div>{new Date(patient.entryTime).toLocaleString()}</div>
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-100 dark:bg-gray-900">
          <div className="my-2">
            Şikayetler:{" "}
            <InlineEditField
              text={patient.complaints}
              onTextChange={(newText) => handleUpdate("complaints", newText)}
              multiline
            />
          </div>
          <div className="my-2">
            Muayene Bulguları:{" "}
            <InlineEditField
              text={patient.examinationFindings}
              onTextChange={(newText) =>
                handleUpdate("examinationFindings", newText)
              }
              multiline
            />
          </div>
          <div className="my-2">
            İstenen Tetkikler:{" "}
            <InlineEditField
              text={patient.testsRequested}
              onTextChange={(newText) =>
                handleUpdate("testsRequested", newText)
              }
              multiline
            />
          </div>
          <div className="my-2">
            Tetkik Sonuçları:{" "}
            <InlineEditField
              text={patient.testResults}
              onTextChange={(newText) => handleUpdate("testResults", newText)}
              multiline
            />
          </div>
          <div className="my-2">
            Hasta Durumu ve Notlar:{" "}
            <InlineEditField
              text={patient.progressNotes}
              onTextChange={(newText) => handleUpdate("progressNotes", newText)}
              multiline
            />
          </div>
          <button
            onClick={() => onDelete(patient.id)}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Hasta Sil
          </button>
        </div>
      )}
    </div>
  );
};

const Home: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  const [patients, setPatients] = useState<IPatient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const initialPatientState = {
    id: 0,
    name: "",
    complaints: "",
    examinationFindings: "",
    testsRequested: "",
    testResults: "",
    progressNotes: "",
    entryTime: new Date(),
  };
  const [newPatient, setNewPatient] =
    useState<Partial<IPatient>>(initialPatientState);

  useEffect(() => {
    setIsClient(true);
    const savedPatients = Cookie.get("patients");
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
  }, []);

  useEffect(() => {
    isClient &&
      Cookie.set("patients", JSON.stringify(patients), { expires: 0.5 });
  }, [patients, isClient]);

  const handleDelete = (id: number) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  const handleUpdate = (updatedPatient: IPatient) => {
    const index = patients.findIndex(
      (patient) => patient.id === updatedPatient.id
    );
    const newPatients = [...patients];
    newPatients[index] = updatedPatient;
    setPatients(newPatients);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleAddPatient = () => {
    const id = patients.length ? Math.max(...patients.map((p) => p.id)) + 1 : 1;
    if (newPatient.name) {
      setPatients([
        ...patients,
        { ...newPatient, id, entryTime: new Date() } as IPatient,
      ]);
      setNewPatient(initialPatientState);
      setShowModal(false);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  interface IPatientDetail {
    label: string;
    value: string | undefined;
  }

  const generatePDF = () => {
    const pdf = new jsPDF();

    pdf.addFileToVFS(`${fontName}.ttf`, fontBase64);
    pdf.addFont(`${fontName}.ttf`, fontName, "normal");
    pdf.setFont(fontName);

    const drawVerticalLine = () => {
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth();
      pdf.setDrawColor(255, 0, 0); // Kırmızı renk
      pdf.setLineWidth(0.5); // Çizgi kalınlığı
      pdf.line(pageWidth / 2, 0, pageWidth / 2, pageHeight); // Sayfanın ortasından dikey çizgi
    };

    let leftColumnY = 10;
    let rightColumnY = 10;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const columnWidth = pageWidth / 2 - 15;

    drawVerticalLine(); // İlk sayfa için dikey çizgi çek

    patients.forEach((patient, index) => {
      const column = index % 2 === 0 ? "left" : "right";
      let y = column === "left" ? leftColumnY : rightColumnY;
      const x = column === "left" ? 10 : pageWidth / 2 + 5;

      pdf.setFontSize(11.2); // %20 küçültülmüş font boyutu
      pdf.setTextColor(0, 0, 255);
      const patientHeader = `${patient.name} - Giriş Saati: ${new Date(
        patient.entryTime
      ).toLocaleString()}`;

      pdf.text(patientHeader, x, y);
      y += 8;

      const details: IPatientDetail[] = [
        { label: "Şikayetler", value: patient.complaints },
        { label: "Muayene Bulguları", value: patient.examinationFindings },
        { label: "İstenen Tetkikler", value: patient.testsRequested },
        { label: "Tetkik Sonuçları", value: patient.testResults },
        { label: "Hasta Durumu ve Notlar", value: patient.progressNotes },
      ];

      details.forEach(({ label, value }) => {
        if (y + 8 > 280) {
          pdf.addPage();
          drawVerticalLine(); // Yeni sayfa için dikey çizgi çek
          y = 10;
        }
        pdf.setFontSize(9.6);
        pdf.setTextColor(255, 0, 0);
        pdf.text(`${label}:`, x, y);
        y += 4.8;

        pdf.setFontSize(8);
        pdf.setTextColor(0, 0, 0);
        const splitText: string[] = pdf.splitTextToSize(
          value || "Belirtilmemiş",
          columnWidth - 5
        );
        splitText.forEach((line) => {
          pdf.text(line, x + 5, y);
          y += 4.8;
        });
        y += 4.8;
      });

      // Hastalar arasına kırmızı çizgi çekme
      pdf.setDrawColor(255, 0, 0); // Kırmızı renk
      pdf.setLineWidth(0.5); // Çizgi kalınlığı
      if (y < 280) {
        // Sayfanın sonuna gelmeden çizgi çek
        pdf.line(x, y, x + columnWidth, y);
        y += 10; // Çizgi sonrası boşluk
      }

      if (column === "left") {
        leftColumnY = y;
      } else {
        rightColumnY = y;
      }

      // Herhangi bir sütun sayfanın sonuna ulaştıysa yeni sayfa ekle ve dikey çizgi çek
      if (leftColumnY > 280 || rightColumnY > 280) {
        pdf.addPage();
        drawVerticalLine();
        leftColumnY = 10;
        rightColumnY = 10;
      }
    });

    pdf.save("hastalar.pdf");
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hasta Dökümantasyonu</h1>
      {patients.length > 0 && (
        <button
          onClick={generatePDF}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          PDF Olarak İndir
        </button>
      )}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Hasta Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-200 rounded p-2 mr-2 w-full"
        />
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Yeni Hasta Ekle
        </button>
      </div>
      {filteredPatients.length > 0 ? (
        filteredPatients.map((patient) => (
          <PatientAccordion
            key={patient.id}
            patient={patient}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>Henüz hasta bulunmamaktadır.</p>
      )}

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-black p-6 rounded shadow-md w-1/2">
            <h2 className="text-lg font-semibold mb-4">Yeni Hasta Ekle</h2>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Hasta Adı"
                value={newPatient.name || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 w-full mb-2"
              />
              <textarea
                name="complaints"
                placeholder="Şikayetler"
                value={newPatient.complaints || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 w-full mb-2"
              />
              <textarea
                name="examinationFindings"
                placeholder="Muayene Bulguları"
                value={newPatient.examinationFindings || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 w-full mb-2"
              />
              <textarea
                name="testsRequested"
                placeholder="İstenen Tetkikler"
                value={newPatient.testsRequested || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 w-full mb-2"
              />
              <textarea
                name="testResults"
                placeholder="Tetkik Sonuçları"
                value={newPatient.testResults || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 w-full mb-2"
              />
              <textarea
                name="progressNotes"
                placeholder="Hasta Durumu ve Notlar"
                value={newPatient.progressNotes || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mr-2"
              >
                İptal
              </button>
              <button
                onClick={handleAddPatient}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
