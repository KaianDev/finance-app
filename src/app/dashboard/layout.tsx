import { ModeToggle } from "@/components/mode-toggle";

import { Header } from "./_components/header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <Header />
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
      {children}
    </>
  );
};

export default DashboardLayout;
