"use client";

import { useState } from "react";
import { content } from "@/app/(portfolio)/_components/content";
import { AccordionSection } from "@/app/(portfolio)/_components/AccordionSection";
import { Accordion } from "@/components/ui/accordion";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  const [language, setLanguage] = useState("tr");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <header className="mb-8 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={256}
            height={256}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
          {content[language].header}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {content[language].subHeader}
        </p>
        <div className="flex items-center space-x-4 mt-4">
          <ModeToggle />
          <button
            onClick={() => setLanguage(language === "en" ? "tr" : "en")}
            className="px-4 py-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded"
          >
            {language === "en" ? "Türkçe" : "English"}
          </button>
        </div>
      </header>

      <main className="w-full max-w-2xl space-y-4">
        <Accordion type="single" collapsible>
          <AccordionSection
            value="resume"
            title={content[language].resume.title}
            content={content[language].resume.content}
          />
          <AccordionSection
            value="academic-career"
            title={content[language].academicCareer.title}
            content={content[language].academicCareer.content}
          />
          <AccordionSection
            value="hobbies"
            title={content[language].hobbies.title}
            content={content[language].hobbies.content}
          />
          <AccordionSection
            value="projects"
            title={content[language].projects.title}
            content={
              <ul className="list-disc list-inside space-y-2">
                {content[language].projects.content.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            }
          />
          <AccordionSection
            value="family-info"
            title={content[language].familyInfo.title}
            content={content[language].familyInfo.content}
          />
          <AccordionSection
            value="languages"
            title={content[language].languages.title}
            content={
              <ul className="list-disc list-inside space-y-2">
                {content[language].languages.content.map(
                  (languageItem, index) => (
                    <li key={index}>{languageItem}</li>
                  )
                )}
              </ul>
            }
          />
        </Accordion>
      </main>

      <footer className="mt-8">
        <ul className="flex space-x-4">
          <li>
            <Link
              href="https://github.com/drcan94"
              className="underline text-blue-500 dark:text-blue-400"
            >
              GitHub
            </Link>
          </li>
          <li>
            <Link
              href="https://twitter.com/drcan94"
              className="underline text-blue-500 dark:text-blue-400"
            >
              Twitter
            </Link>
          </li>
          <li>
            <Link
              href="https://instagram.com/drcan025"
              className="underline text-blue-500 dark:text-blue-400"
            >
              Instagram
            </Link>
          </li>
          <li>
            <Link
              href="https://linkedin.com/in/drcan94"
              className="underline text-blue-500 dark:text-blue-400"
            >
              LinkedIn
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
