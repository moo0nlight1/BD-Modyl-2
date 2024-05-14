import { TicketPriceForPlane, requests, sql } from "@/lib/sql_requests";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function TicketPriceForPlaneComponent() {
  const tickets_data: TicketPriceForPlane[] =
    await requests.get_ticket_price_for_plane();

  return (
    <>
      <div className="flex justify-between mt-4">
        <code className="mb-6">{sql.ticket_price_for_plane}</code>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] text-nowrap">
              Модель літака
            </TableHead>
            <TableHead className="text-right text-nowrap">
              Середня ціна польоту
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets_data.map((ticket, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{ticket.PlaneModel}</TableCell>
              <TableCell className="font-medium text-right">
                {ticket.AveragePrice}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
