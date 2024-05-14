"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  get_flights_by_plane,
  get_server_count_flights_by_land,
  get_server_flights_by_company_name,
  get_server_flights_by_land,
  get_tickets_by_dest_and_company_name,
  get_tickets_by_destination_name,
  get_tickets_by_month_and_class,
} from "@/lib/explicit_server_requests";
import { sql } from "@/lib/sql_requests";
import { Flight, Ticket } from "@/types/Ticket";
import { useEffect, useLayoutEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months } from "@/lib/month";

export default function FlightsClient() {
  const [flights, setFlights] = useState<Array<Flight>>([]);
  const [count, setCount] = useState<string>("");
  const [input, setInput] = useState<string>("");

  useLayoutEffect(() => {
    get_server_count_flights_by_land(input).then((response) => {
      setCount(response);
    });
    get_server_flights_by_land(input).then((response) => {
      setFlights(response);
    });
  }, [input]);

  return (
    <>
      <Input
        placeholder="Країна прибуття"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        className="rounded-[6px] h-9 mb-4 border-zinc-300 w-[250px]"
      />
      <code>{sql.flights_by_land(input)}</code>
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
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger>
            <p className="text-primary text-sm text-zinc-800">
              Кількість рейсів
              {input != "" ? `, що приземлилися у ${input}: ` : ": "}
              <span className="text-black font-medium">{count}</span>
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p className="bg-zinc-900 text-white rounded-[2px] py-1.5 px-3">
              {sql.count_landed_to(input)}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

export function FlightsByCompany() {
  const [flights, setFlights] = useState<Array<Flight>>([]);
  const [input, setInput] = useState<string>("");

  useLayoutEffect(() => {
    get_server_flights_by_company_name(input).then((response) => {
      setFlights(response);
    });
  }, [input]);

  return (
    <>
      <Input
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        placeholder="Назва компанії"
        className="rounded-[6px] h-9 my-4 border-zinc-300 w-[250px]"
      />
      <code>{sql.flights_by_company_name(input)}</code>
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

export function TicketsByDestination() {
  const [tickets, setTickets] = useState<Array<Ticket>>([]);
  const [input, setInput] = useState<string>("");

  useLayoutEffect(() => {
    get_tickets_by_destination_name(input).then((response) => {
      setTickets(response);
    });
  }, [input]);

  return (
    <>
      <Input
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        placeholder="Країна прибуття"
        className="rounded-[6px] h-9 my-4 border-zinc-300 w-[250px]"
      />
      <code>{sql.find_tickets_by_dest_name(input)}</code>
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
          {tickets.map((ticket) => (
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
    </>
  );
}

export function CountFlightsDoneByPlane() {
  const [count, setCount] = useState<string>("0");
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    get_flights_by_plane(input).then((r) => {
      setCount(r);
    });
  }, [input]);

  return (
    <>
      <code>{sql.find_flights_by_plane(input)}</code>

      <Input
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        placeholder="Модель літака (e.g.: Boeing777)"
      />
      <p className="text-primary text-zinc-700 text-sm mt-3">
        Кількість польотів виконаних літаком{input ? ` ${input}: ` : ": "}{" "}
        <span className="text-primary text-black font-medium">{count}</span>
      </p>
    </>
  );
}

export function FlightsDuringAndClass() {
  const [tickets, setTickets] = useState<Array<Ticket>>([]);
  const [input, setInput] = useState<string>("0");
  const [ticketClass, setTicketClass] = useState<string>("");

  useLayoutEffect(() => {
    get_tickets_by_month_and_class(input, ticketClass).then((response) => {
      setTickets(response);
    });
  }, [input, ticketClass]);

  function SelectMonth() {
    return (
      <Select
        onValueChange={(value) => {
          setInput(value);
        }}
      >
        <SelectTrigger className="w-[180px] mt-2">
          <SelectValue placeholder="Місяць" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {dummyArray.map((_, i) => (
            <SelectItem
              className="hover:bg-zinc-300"
              key={i}
              value={(i + 1).toString()}
            >
              {months[i]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  function SelectClass() {
    return (
      <Select
        onValueChange={(value) => {
          setTicketClass(value);
        }}
      >
        <SelectTrigger className="w-[180px] mt-2">
          <SelectValue placeholder="Клас" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem className="hover:bg-zinc-300" value={"Бізнес"}>
            Бізнес
          </SelectItem>
          <SelectItem className="hover:bg-zinc-300" value={"Перший клас"}>
            Перший клас
          </SelectItem>
          <SelectItem className="hover:bg-zinc-300" value={"Економ"}>
            Економ
          </SelectItem>
        </SelectContent>
      </Select>
    );
  }

  const dummyArray = Array(12).fill(null);

  return (
    <>
      <code>{sql.find_tickets_by_month_and_class(input, ticketClass)}</code>
      <div className="flex gap-2">
        <SelectMonth />
        <SelectClass />
      </div>

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
          {tickets.map((ticket) => (
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
    </>
  );
}

export function FlightsByDestinationAndCompany() {
  const [tickets, setTickets] = useState<Array<Ticket>>([]);
  const [input, setInput] = useState<string>("Лондон");
  const [company, setCompany] = useState<string>("Singapore");

  useLayoutEffect(() => {
    get_tickets_by_dest_and_company_name(input, company).then((response) => {
      setTickets(response);
    });
  }, [input, company]);

  return (
    <>
      <code>{sql.find_tickets_by_dest_and_company_name(input, company)}</code>
      <div className="flex gap-4">
        <Input
          onChange={(event) => {
            setInput(event.target.value);
          }}
          value={input}
          placeholder="Країна прибуття"
        />
        <Input
          placeholder="Авіакомпанія"
          onChange={(event) => {
            setCompany(event.target.value);
          }}
          value={company}
        />
      </div>
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
          {tickets.map((ticket) => (
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
    </>
  );
}
