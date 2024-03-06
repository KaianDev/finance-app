export interface Activity {
  id: number;
  date: Date;
  description: string;
  value: number;
  type: "REVENUE" | "EXPENSE";
}
