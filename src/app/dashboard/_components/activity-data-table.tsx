import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";

const getData = (): Payment[] => {
  return [
    {
      id: "aaa",
      amount: 2000,
      email: "a@g.com",
      status: "failed"
    }
  ];
};

export const ActivityDataTable = () => {
  const data = getData();
  return <DataTable columns={columns} data={data} />;
};
