import { CompanyFlightFinal, requests, sql } from "@/lib/sql_requests";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function CompanyFlightFinalComponent() {
  const tickets_data: CompanyFlightFinal[] =
    await requests.get_company_flight_final();

  return (
    <>
      <div className="flex justify-between mt-4">
        <code className="mb-3">{sql.tickets_and_tickets_flights}</code>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] text-nowrap">
              Назва компанії
            </TableHead>
            <TableHead className="w-[300px] text-nowrap">Назва рейсу</TableHead>
            <TableHead className="text-right text-nowrap">
              Країна прибуття
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets_data.map((ticket, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {ticket.CompanyName}
              </TableCell>
              <TableCell className="font-medium">{ticket.FlightName}</TableCell>
              <TableCell className="text-right">{ticket.FinallD}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
