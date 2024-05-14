"use client";

import { get_period, requests, sql } from "@/lib/sql_requests";
import { Ticket } from "@/types/Ticket";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useLayoutEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { get_server_tickets_during } from "@/lib/explicit_server_requests";

export default function TicketsDuring() {
  const [option, setOption] = useState<
    "winter" | "autumn" | "spring" | "summer"
  >("autumn");

  const [loading, setLoading] = useState<boolean>(false);

  const [tickets_during, setTickets] = useState<Ticket[]>([]);

  useLayoutEffect(() => {
    setLoading(true);
    setTickets([]);
    get_server_tickets_during(option).then((response) => {
      setTickets(response);
      setLoading(false);
    });
  }, [option]);

  return (
    <>
      <div className="flex justify-between">
        <code>
          {sql.tickets_during([get_period[option][0], get_period[option][1]])}
        </code>
      </div>
      <RadioGroup
        defaultValue="winter"
        value={option}
        onValueChange={(event) => {
          // @ts-ignore
          setOption(event);
        }}
        className="flex gap-5 mt-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="winter" id="winter" />
          <Label htmlFor="winter">Зимою</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="spring" id="spring" />
          <Label htmlFor="spring">Навесні</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="summer" id="summer" />
          <Label htmlFor="summer">Влітку</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="autumn" id="autumn" />
          <Label htmlFor="autumn">Восени</Label>
        </div>
      </RadioGroup>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-nowrap">
              Номер польоту
            </TableHead>
            <TableHead className="w-[200px]">Дата польоту</TableHead>
            <TableHead className="w-[125px]">Ціна квитка</TableHead>
            <TableHead className="w-[150px]">Кількість квитків</TableHead>
            <TableHead className="text-right">Клас</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!loading &&
            tickets_during.map((ticket) => (
              <TableRow key={ticket.FlightNum}>
                <TableCell className="font-medium">
                  {ticket.FlightNum}
                </TableCell>
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
