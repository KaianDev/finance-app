import { ActivityForm } from "./_components/activity-form";

const DashboardPage = () => {
  return (
    <div className="container mt-5 p-5">
      <div className="rounded-md bg-zinc-200 p-5 shadow-lg shadow-black/20 dark:bg-secondary">
        <ActivityForm />
      </div>
    </div>
  );
};

export default DashboardPage;
