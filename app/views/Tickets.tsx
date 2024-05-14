// @ts-nocheck

import { requests, sql } from "@/lib/sql_requests";
import { Ticket } from "@/types/Ticket";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

const tickets = {
  all: {
    count_preview: sql.count_tickets,
    count: requests.count_tickets(),
    request: requests.get_tickets(),
    preview: sql.ticket,
  },
  more_than_price: {
    request: requests.get_tickets_more_than_price(5000),
    preview: sql.tickets_more_than(5000),
  },
};

export default async function Tickets({
  tickets_query = "all",
}: {
  tickets_query?: "all" | "more_than_price";
}) {
  const tickets_data: Array<Ticket> = await tickets[tickets_query].request;

  async function TicketStats() {
    if (tickets_query == "all") {
      const average_price = await requests.get_tickets_average_price();
      const prices = await requests.get_tickets_min_and_max_price();

      return (
        <div className="flex items-center gap-2 mt-4">
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger className="text-primary text-sm">
                Середня вартість квитка:{" "}
                <span className="text-black font-medium">{average_price}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-zinc-900 text-white rounded-[2px] py-1.5 px-3">
                  {sql.tickets_average_price}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger className="text-primary text-sm flex gap-2">
                <p>
                  Мінімальна вартість:{" "}
                  <span className="text-black font-medium">{prices.min}</span>
                </p>
                <p>
                  Максимальна вартість:{" "}
                  <span className="text-black font-medium">{prices.max}</span>
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-zinc-900 text-white rounded-[2px] py-1.5 px-3">
                  {sql.tickets_min_and_max_price}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    }
  }

  function TicketsHeader() {
    return (
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-nowrap">Номер польоту</TableHead>
          <TableHead className="w-[200px]">Дата польоту</TableHead>
          <TableHead className="w-[125px]">Ціна квитка</TableHead>
          <TableHead className="w-[150px]">Кількість квитків</TableHead>
          <TableHead className="text-right">Клас</TableHead>
        </TableRow>
      </TableHeader>
    );
  }

  return (
    <main>
      <div className="flex justify-between">
        <code>{tickets[tickets_query].preview}</code>
        {tickets_query === "all" && (
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger className="text-primary text-sm">
                Кількість квитків у базі даних:{" "}
                <span className="font-bold">{tickets["all"].count}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-zinc-900 text-white rounded-[2px] py-1.5 px-3">
                  {tickets["all"].count_preview}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <Table>
        <TicketsHeader />
        <TableBody>
          {tickets_data.map((ticket) => (
            <TableRow key={ticket.FlightNum}>
              <TableCell className="font-medium">{ticket.FlightNum}</TableCell>
              <TableCell>{new Date(ticket.Date).toDateString()}</TableCell>
              <TableCell>{ticket.Value}</TableCell>
              <TableCell>{ticket.TicketQ}</TableCell>
              <TableCell className="text-right">{ticket.TicketC}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TicketStats />
    </main>
  );
}
