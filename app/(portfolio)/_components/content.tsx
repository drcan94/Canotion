/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React from "react";

export type Content = {
  header: string;
  subHeader: string;
  resume: {
    title: string;
    content: React.ReactNode;
  };
  academicCareer: {
    title: string;
    content: React.ReactNode;
  };
  hobbies: {
    title: string;
    content: React.ReactNode;
  };
  projects: {
    title: string;
    content: React.ReactNode[];
  };
  familyInfo: {
    title: string;
    content: React.ReactNode;
  };
  languages: {
    title: string;
    content: React.ReactNode[];
  };
};

export const content: Record<string, Content> = {
  en: {
    header: "Burak CAN, MD",
    subHeader: "An overview of my work and experiences",
    resume: {
      title: "Resume",
      content: (
        <p>
          I am an anesthesiology resident and developer. Born in 1994, I started
          my medical studies at Atatürk University in 2013 and transferred to
          Sakarya University in 2017, graduating in January 2023. During the
          COVID-19 pandemic (around April 2020), I decided to shift my focus
          from studying for the TUS (Medical Specialty Exam) to software
          development. Within my first six months, I built my first amateur
          website:{" "}
          <Link
            href="https://github.com/drcan94/journalist"
            className="underline text-blue-500 hover:text-blue-700"
          >
            Journal System
          </Link>
          . I met my wife, Zehra, in December 2015, and we married in September
          2020. We have a son who was born in February 2022.
        </p>
      ),
    },
    academicCareer: {
      title: "Academic Career",
      content: (
        <p>
          After an extended academic journey, I completed my medical degree and
          worked as a general practitioner for 1.5 years in various hospitals in
          Konya (Taşkent, Hadim, Bozkır, Beyhekim) and in Hatay/Samandağ. During
          this time, I also completed my mandatory government service. In March
          2024, I took the TUS exam and was accepted into the Anesthesiology
          program at Necmettin Erbakan University Faculty of Medicine (Meram). I
          started this journey in September 2024. I'm currently at the beginning
          of my specialty training, learning under the supervision of
          experienced mentors and senior colleagues.
        </p>
      ),
    },
    hobbies: {
      title: "Hobbies",
      content: (
        <p>
          I love playing chess, coding for hours, and exploring new
          technologies. Especially while working in my field, creating software
          solutions to make my tasks easier—or imagining potential solutions,
          even if they don't always materialize—is very exciting.
        </p>
      ),
    },
    projects: {
      title: "Projects",
      content: [
        <span key="project1">
          <Link
            href="/sivi"
            className="underline text-blue-500 hover:text-blue-700"
          >
            Intraoperative Fluid Tracker
          </Link>
          : A system built with Next.js and Tailwind CSS to automate fluid
          calculations for patients during surgery.
        </span>,
        <span key="project2">
          <Link
            href="https://shopier.com/your-link"
            className="underline text-blue-500 hover:text-blue-700"
          >
            Educational Content Platform
          </Link>
          : Created educational content with Notion, accessible via Shopier,
          aimed at new doctors.
        </span>,
        <span key="project3">
          <Link
            href="/dosage"
            className="underline text-blue-500 hover:text-blue-700"
          >
            Dosage Calculation Application
          </Link>
        </span>,
      ],
    },
    familyInfo: {
      title: "Family Information",
      content: (
        <p>
          I met my wife, Zehra, in December 2015, and we married in September
          2020. In February 2022, we welcomed our lovely son.{" "}
          <span role="img" aria-label="smile">
            😊
          </span>
        </p>
      ),
    },
    languages: {
      title: "Languages Known",
      content: [
        <span key="language1">
          Programming Languages: Python (Django REST Framework), JavaScript
          (Next.js, TypeScript)
        </span>,
        <span key="language2">
          Human Languages: English (intermediate), Turkish (native)
        </span>,
      ],
    },
  },
  tr: {
    header: "Dr. Burak CAN",
    subHeader: "Çalışmalarım ve deneyimlerimin bir özeti",
    resume: {
      title: "Özgeçmiş",
      content: (
        <p>
          Anestezi asistanı ve geliştiriciyim. 1994 doğumluyum. 2013 yılında
          Atatürk Üniversitesi Tıp Fakültesi'ne başladım ve 2017'de Sakarya
          Üniversitesi'ne yatay geçiş yaptım, Ocak 2023'te mezun oldum. COVID-19
          pandemisi sırasında (2020 Nisan civarı), TUS'a (Tıpta Uzmanlık Sınavı)
          çalışmayı bırakıp yazılıma yönelmeye karar verdim. İlk altı ayımda ilk
          amatör web sitem olan bir{" "}
          <a
            href="https://github.com/drcan94/journalist"
            className="underline text-blue-500 hover:text-blue-700"
          >
            dergi sistemini
          </a>{" "}
          yaptım. Eşim Zehra ile Aralık 2015'te tanıştım ve Eylül 2020'de
          evlendik. Şubat 2022'de bir oğlumuz oldu.
        </p>
      ),
    },
    academicCareer: {
      title: "Akademik Kariyer",
      content: (
        <p>
          Uzatmalı akademik yolculuğumun ardından tıp eğitimimi tamamladım ve
          1.5 yıl boyunca Konya'nın çeşitli hastanelerinde (Taşkent, Hadim,
          Bozkır, Beyhekim) ve Hatay/Samandağ'da pratisyen hekim olarak
          çalıştım. Bu süre zarfında devlet hizmet yükümlülüğümü de tamamladım.
          Mart 2024'te TUS'a girdim ve Necmettin Erbakan Üniversitesi Meram Tıp
          Fakültesi Anesteziyoloji ve Reanimasyon bölümünü kazandım. Eylül
          2024'te başladığım bu yolculuğun henüz başındayım. Akredite bir
          klinikte, yetkin hocalarımızın ve kıdemlilerimizin gözetiminde
          uzmanlık eğitimi sürecim devam ediyor.
        </p>
      ),
    },
    hobbies: {
      title: "Hobiler",
      content: (
        <p>
          Satranç oynamayı, saatlerce kod yazmayı ve yeni teknolojileri
          keşfetmeyi seviyorum. Özellikle mesleğimi yaparken yazılımla işlerimi
          kolaylaştırmak veya bazen gerçekleşmese de çözümler hayal etmek çok
          heyecan verici.
        </p>
      ),
    },
    projects: {
      title: "Projeler",
      content: [
        <span key="project1">
          <a
            href="/sivi"
            className="underline text-blue-500 hover:text-blue-700"
          >
            İntraoperatif Sıvı Takipçisi
          </a>
          : Ameliyat sırasında hasta sıvı hesaplamalarını otomatikleştirmek için
          Next.js ve Tailwind CSS kullanılarak oluşturulmuş bir sistem.
        </span>,
        <span key="project2">
          <a
            href="https://www.shopier.com/28216295"
            className="underline text-blue-500 hover:text-blue-700"
          >
            Eğitim İçeriği Platformu
          </a>
          : Yeni doktorlar için Shopier üzerinden erişilebilen, Notion ile
          oluşturulmuş eğitim içerikleri.
        </span>,
        <span key="project3">
          <a
            href="/dosage"
            className="underline text-blue-500 hover:text-blue-700"
          >
            Doz Hesaplama Uygulaması
          </a>
        </span>,
      ],
    },
    familyInfo: {
      title: "Aile Bilgileri",
      content: (
        <p>
          Eşim Zehra ile Aralık 2015'te tanıştım ve Eylül 2020'de evlendik.
          Şubat 2022'de dünya tatlısı bir oğlumuz oldu.{" "}
          <span role="img" aria-label="smile">
            😊
          </span>
        </p>
      ),
    },
    languages: {
      title: "Bilinen Diller",
      content: [
        <span key="language1">
          Yazılım Dilleri: Python (Django REST Framework), JavaScript (Next.js,
          TypeScript)
        </span>,
        <span key="language2">
          İnsan Dilleri: İngilizce (orta), Türkçe (ana dil)
        </span>,
      ],
    },
  },
};
