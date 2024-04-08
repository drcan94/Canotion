const PDocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full min-w-full py-10 dark:bg-[#1F1F1F] dark:text-white">
      {children}
    </div>
  );
};

export default PDocsLayout;
