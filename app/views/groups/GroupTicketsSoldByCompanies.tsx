import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requests, sql } from "@/lib/sql_requests";

export default async function GroupTicketsSoldByCompanies() {
  const tickets: Array<{ CompanyName: string; SoldTickets: string }> =
    await requests.get_tickets_sold_by_companies();

  return (
    <>
      <div className="my-4">
        <code>{sql.group_tickets_sold_by_companies}</code>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-nowrap">Компанія</TableHead>
            <TableHead className="w-[260px]">
              Кількість проданих квитків
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {ticket.CompanyName}
              </TableCell>
              <TableCell className="font-medium">
                {ticket.SoldTickets}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
