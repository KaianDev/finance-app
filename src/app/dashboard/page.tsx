import { ActivityBalance } from "./_components/activity-balance";
import { ActivityDataTable } from "./_components/activity-data-table";
import { ActivityForm } from "./_components/activity-form";
import { GeneratePDF } from "./_components/generate-pdf";

const DashboardPage = () => {
  return (
    <div className="container mt-5 p-5">
      <div className="rounded-md bg-zinc-200 p-5 shadow-lg shadow-black/20 dark:bg-secondary">
        <ActivityForm />
        <ActivityDataTable />
        <div className="flex flex-col items-center justify-between sm:flex-row sm:gap-8 md:justify-center">
          <ActivityBalance />
          <GeneratePDF />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
