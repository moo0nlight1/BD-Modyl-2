import { TicketsAndFlights, requests, sql } from "@/lib/sql_requests";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function TicketsAndFlightsComponent() {
  const tickets_data: TicketsAndFlights[] =
    await requests.get_tickets_and_tickets_flights();

  return (
    <>
      <div className="flex justify-between mt-4">
        <code className="mb-3">{sql.tickets_and_tickets_flights}</code>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30px] text-nowrap">#</TableHead>
            <TableHead className="w-[100px] text-nowrap">id компанії</TableHead>
            <TableHead className="w-[200px] text-nowrap">Назва рейсу</TableHead>
            <TableHead className="w-[100px] text-nowrap">
              Країна прибуття
            </TableHead>
            <TableHead className="w-[130px] text-nowrap">
              Дата польоту
            </TableHead>
            <TableHead className="w-[100px] text-nowrap">Ціна квитка</TableHead>
            <TableHead className="w-[60px] text-nowrap">Квитки</TableHead>
            <TableHead className="text-right text-nowrap">Клас</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets_data.map((ticket) => (
            <TableRow key={ticket.FlightNum}>
              <TableCell className="font-medium">{ticket.FlightNum}</TableCell>
              <TableCell className="font-medium">{ticket.CompanyID}</TableCell>
              <TableCell className="font-medium">{ticket.FlightName}</TableCell>
              <TableCell className="font-medium">{ticket.FinallD}</TableCell>
              <TableCell>{new Date(ticket.Date).toDateString()}</TableCell>
              <TableCell>{ticket.Value}</TableCell>
              <TableCell>{ticket.TicketQ}</TableCell>
              <TableCell className="text-right">{ticket.TicketC}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
