"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { useState } from "react";

// Step 1: Setting up the main layout (App Directory)
export default function Dashboard() {
  const [language, setLanguage] = useState("tr");

  type Content = {
    header: string;
    subHeader: string;
    resume: {
      title: string;
      content: string;
    };
    academicCareer: {
      title: string;
      content: string;
    };
    hobbies: {
      title: string;
      content: string;
    };
    projects: {
      title: string;
      content: string[];
    };
    familyInfo: {
      title: string;
      content: string;
    };
    languages: {
      title: string;
      content: string[];
    };
  };

  const content: Record<string, Content> = {
    en: {
      header: "Burak CAN, MD",
      subHeader: "An overview of my work and experiences",
      resume: {
        title: "Resume",
        content:
          "I am an anesthesiology resident and developer. Born in 1994, I started my medical studies at Atatürk University in 2013 and transferred to Sakarya University in 2017, graduating in January 2023. During the COVID-19 pandemic (around April 2020), I decided to shift my focus from studying for the TUS (Medical Specialty Exam) to software development. Within my first 6 months, I built my first amateur website—a magazine system. The code can be found here: GitHub - Journalist. I met my wife, Zehra, in December 2015, and we married in September 2020. We have a son who was born in February 2022.",
      },
      academicCareer: {
        title: "Academic Career",
        content:
          "After an extended academic journey, I completed my medical degree and worked as a general practitioner for 1.5 years in various hospitals in Konya (Taşkent, Hadim, Bozkır, Beyhekim) and in Hatay/Samandağ. During this time, I also completed my mandatory government service. In March 2024, I took the TUS exam and got accepted into the Necmettin Erbakan University Faculty of Medicine (Meram) Anesthesia program. I started this journey in September 2024 and am currently at the beginning of my specialty training, learning under the supervision of experienced mentors and senior colleagues.",
      },
      hobbies: {
        title: "Hobbies",
        content:
          "I love playing chess, coding for hours, and exploring new technologies. Especially while working in my field, creating software solutions to make my tasks easier—or imagining potential solutions, even if they don't always materialize—is very exciting.",
      },
      projects: {
        title: "Projects",
        content: [
          "Intraoperative Fluid Tracker: A system built with Next.js and Tailwind CSS to automate fluid calculations for patients during surgery.",
          "Educational Content Platform: Created educational content with Notion, accessible via Shopier, aimed at new doctors.",
        ],
      },
      familyInfo: {
        title: "Family Information",
        content:
          "I met my wife, Zehra, in December 2015, and we married in September 2020. In February 2022, we welcomed our lovely son :)",
      },
      languages: {
        title: "Languages Known",
        content: [
          "Programming Languages: Python (Django-DRF), JavaScript (Next.js, TypeScript)",
          "Human Languages: English (intermediate), Turkish (native)",
        ],
      },
    },
    tr: {
      header: "Dr. Burak CAN",
      subHeader: "Çalışmalarım ve deneyimlerimin bir özeti",
      resume: {
        title: "Özgeçmiş",
        content:
          "Anestezi asistanı ve geliştiriciyim. 1994 doğumluyum, 2013 yılında Atatürk Üniversitesi'nde tıp fakültesine başladım ve 2017'de Sakarya Üniversitesi'ne yatay geçiş yaptım, Ocak 2023'te mezun oldum. COVID-19 pandemisi sırasında (2020 Nisan civarı), TUS'a (Tıpta Uzmanlık Sınavı) çalışmayı bırakıp yazılıma yönelmeye karar verdim. İlk 6 ayımda, ilk amatör web sitemi—bir dergi sistemi—yaptım. Kodları burada bulabilirsiniz: GitHub - Journalist. Eşim Zehra ile Aralık 2015'te tanıştım ve Eylül 2020'de evlendik. Şubat 2022'de doğan bir oğlumuz var.",
      },
      academicCareer: {
        title: "Akademik Kariyer",
        content:
          "Uzatmalı akademik yolculuğumun ardından tıp eğitimimi tamamladım ve 1.5 yıl boyunca Konya'nın çeşitli hastanelerinde (Taşkent, Hadim, Bozkır, Beyhekim) ve Hatay Samandağ'da pratisyen hekim olarak çalıştım. Bu süre zarfında devlet hizmet yükümlülüğümü de tamamladım. Mart 2024'te TUS'a girdim ve Necmettin Erbakan Üniversitesi Tıp Fakültesi (Meram) Anestezi bölümünü kazandım. Eylül 2024'te başladığım bu yolculuğun henüz başındayım. Akredite bir klinikte, yetkin hocalarımızın ve kıdemlilerimizin gözetiminde uzmanlık eğitimi sürecim devam ediyor.",
      },
      hobbies: {
        title: "Hobiler",
        content:
          "Satranç oynamayı, saatlerce kod yazmayı ve yeni teknolojileri keşfetmeyi seviyorum. Özellikle mesleğimi yaparken yazılımla işlerimi kolaylaştırmak ve bazen gerçekleşmese de çözümler hayal etmek çok heyecan verici",
      },
      projects: {
        title: "Projeler",
        content: [
          "İntraoperatif Sıvı Takipçisi: Ameliyat sırasında hasta sıvı hesaplamalarını otomatikleştirmek için Next.js ve Tailwind CSS kullanılarak oluşturulmuş bir sistem.",
          "Eğitim İçeriği Platformu: Yeni doktorlar için Shopier üzerinden erişilebilen Notion ile oluşturulmuş eğitim içerikleri.",
        ],
      },
      familyInfo: {
        title: "Aile Bilgileri",
        content:
          "Sevgili eşim Zehra ile Aralık 2015'te tanıştım ve Eylül 2020'de evlendik. Şubat 2022'de dünya tatlısı bir oğlumuz oldu :)",
      },
      languages: {
        title: "Bilinen Diller",
        content: [
          "Yazılım Dilleri: Python (Django-DRF), JavaScript (Next.js, TypeScript)",
          "İnsan Dilleri: İngilizce (orta), Türkçe (ana dil)",
        ],
      },
    },
  };

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
          <AccordionItem value="resume">
            <AccordionTrigger className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {content[language].resume.title}
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-700 dark:text-gray-300">
              {content[language].resume.content}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="academic-career">
            <AccordionTrigger className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {content[language].academicCareer.title}
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-700 dark:text-gray-300">
              {content[language].academicCareer.content}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="hobbies">
            <AccordionTrigger className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {content[language].hobbies.title}
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-700 dark:text-gray-300">
              {content[language].hobbies.content}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="projects">
            <AccordionTrigger className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {content[language].projects.title}
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-700 dark:text-gray-300">
              <ul className="list-disc list-inside">
                {content[language].projects.content.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="family-info">
            <AccordionTrigger className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {content[language].familyInfo.title}
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-700 dark:text-gray-300">
              {content[language].familyInfo.content}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="languages">
            <AccordionTrigger className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {content[language].languages.title}
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-700 dark:text-gray-300">
              <ul className="list-disc list-inside">
                {content[language].languages.content.map(
                  (languageItem, index) => (
                    <li key={index}>{languageItem}</li>
                  )
                )}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>

      <footer className="mt-8">
        <ul className="flex space-x-4">
          <li>
            <a
              href="https://github.com/drcan94"
              className="text-blue-500 dark:text-blue-400"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/drcan94"
              className="text-blue-500 dark:text-blue-400"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/drcan94"
              className="text-blue-500 dark:text-blue-400"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/drcan94"
              className="text-blue-500 dark:text-blue-400"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
