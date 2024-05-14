import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { months } from "@/lib/month";
import { requests, sql } from "@/lib/sql_requests";

export default async function MonthGroupedFlights() {
  const tickets: Array<{ Month: number; AveragePrice: string }> =
    await requests.get_tickets_price_grouped_by_month();

  return (
    <>
      <code>{sql.group_tickets_by_month}</code>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-nowrap">Місяць</TableHead>
            <TableHead className="w-[260px]">
              Середня вартість квитка за місяць
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {months[ticket.Month - 1]}
              </TableCell>
              <TableCell className="font-medium">
                {ticket.AveragePrice}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
