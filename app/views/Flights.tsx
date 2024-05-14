import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requests, sql } from "@/lib/sql_requests";
import { Flight } from "@/types/Ticket";

export default async function Flights() {
  const flights: Array<Flight> = await requests.get_flights();

  return (
    <>
      <code>{sql.flights}</code>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-nowrap">Номер рейсу</TableHead>
            <TableHead className="w-[260px]">Назва рейсу</TableHead>
            <TableHead className="w-[200px]">Номер компанії</TableHead>
            <TableHead className="text-nowrap">Країна прибуття</TableHead>
            <TableHead className="text-right text-nowrap">
              Номер квитка
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flights.map((flight) => (
            <TableRow key={flight.FlightNum}>
              <TableCell className="font-medium">{flight.FlightNum}</TableCell>
              <TableCell className="font-medium">{flight.FlightName}</TableCell>
              <TableCell>{flight.CompanyID}</TableCell>
              <TableCell>{flight.FinallD}</TableCell>
              <TableCell className="text-right">{flight.Ticket_Id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
