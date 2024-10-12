import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface AccordionSectionProps {
  value: string;
  title: string;
  content: React.ReactNode;
}

export function AccordionSection({
  value,
  title,
  content,
}: AccordionSectionProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        {title}
      </AccordionTrigger>
      <AccordionContent className="text-base text-gray-700 dark:text-gray-300">
        {content}
      </AccordionContent>
    </AccordionItem>
  );
}
