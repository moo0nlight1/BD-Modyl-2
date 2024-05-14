import { Flight, Ticket } from "@/types/Ticket";
import { aviacompany, ticket, ticket_flight } from "@prisma/client";
import { serialize } from "./utils";
import prisma from "./db";

async function get_tickets(): Promise<Ticket[]> {
  return await prisma.$queryRawUnsafe(sql.ticket);
}

export const get_period = {
  autumn: [9, 11],
  winter: [12, 2],
  spring: [3, 5],
  summer: [6, 8],
};

async function get_tickets_during(
  period: "winter" | "autumn" | "spring" | "summer",
): Promise<Ticket[]> {
  return await prisma.$queryRawUnsafe(sql.tickets_during(get_period[period]));
}

async function get_tickets_more_than_price(price: number): Promise<Ticket[]> {
  return await prisma.$queryRawUnsafe(sql.tickets_more_than(price));
}

async function count_tickets(): Promise<string> {
  const request: Array<any> = await prisma.$queryRawUnsafe(sql.count_tickets);
  const count = serialize(request, "Total");

  return count;
}

async function get_aviacompanies(): Promise<aviacompany[]> {
  return await prisma.$queryRawUnsafe(sql.avia_companies);
}

async function get_flights(): Promise<Flight[]> {
  return await prisma.$queryRawUnsafe(sql.flights);
}

async function get_tickets_average_price(): Promise<string> {
  const request: Array<any> = await prisma.$queryRawUnsafe(
    sql.tickets_average_price,
  );
  const count = serialize(request, "AveragePrice");

  return parseInt(count).toFixed();
}

async function get_tickets_min_and_max_price(): Promise<{
  min: string;
  max: string;
}> {
  const request: Array<any> = await prisma.$queryRawUnsafe(
    sql.tickets_min_and_max_price,
  );

  const min = serialize(request, "MinPrice");
  const max = serialize(request, "MaxPrice");

  return {
    min,
    max,
  };
}

async function get_overall_planes_capacity(): Promise<string> {
  const request: Array<any> = await prisma.$queryRawUnsafe(
    sql.overall_planes_capacity,
  );
  const count = serialize(request, "PlanesCapacity");

  return parseInt(count).toFixed();
}

async function get_tickets_grouped_by_class(): Promise<
  Array<{ TicketC: string; Amount: string }>
> {
  let list: any[] = [];
  const request: Array<{ TicketC: string; Amount: string }> =
    await prisma.$queryRawUnsafe(sql.group_sold_tickets_by_class);

  request.forEach((item) => {
    let tempItem = item;

    tempItem.Amount = serialize(tempItem, "Amount");

    list = [...list, tempItem];
  });

  return request;
}

async function get_tickets_price_grouped_by_month(): Promise<
  Array<{ Month: number; AveragePrice: string }>
> {
  const request: Array<{ Month: number; AveragePrice: string }> =
    await prisma.$queryRawUnsafe(sql.group_tickets_by_month);

  return request;
}

async function get_tickets_sold_by_companies(): Promise<
  Array<{ CompanyName: string; SoldTickets: string }>
> {
  let list: any[] = [];

  const request: Array<{ CompanyName: string; SoldTickets: string }> =
    await prisma.$queryRawUnsafe(sql.group_tickets_sold_by_companies);

  request.forEach((item) => {
    let tempItem = item;

    tempItem.SoldTickets = serialize(tempItem, "SoldTickets");

    list = [...list, tempItem];
  });

  return request;
}

async function get_flights_count_by_plane_model(): Promise<
  Array<{ PlaneModel: string; FlightsCount: string }>
> {
  let list: any[] = [];

  const request: Array<{ PlaneModel: string; FlightsCount: string }> =
    await prisma.$queryRawUnsafe(sql.group_flights_by_plane_model);

  request.forEach((item) => {
    let tempItem = item;

    tempItem.FlightsCount = serialize(tempItem, "FlightsCount");

    list = [...list, tempItem];
  });

  return request;
}

export type TicketsAndFlights = ticket & ticket_flight;

async function get_tickets_and_tickets_flights(): Promise<TicketsAndFlights[]> {
  return await prisma.$queryRawUnsafe(sql.tickets_and_tickets_flights);
}

export type CompanyFlightFinal = {
  CompanyName: string;
  FlightName: string;
  FinallD: string;
};

async function get_company_flight_final(): Promise<CompanyFlightFinal[]> {
  return await prisma.$queryRawUnsafe(sql.company_flight_final);
}

export type TicketPriceForPlane = {
  PlaneModel: string;
  AveragePrice: string;
};

async function get_ticket_price_for_plane(): Promise<TicketPriceForPlane[]> {
  let list: any[] = [];
  const req: TicketPriceForPlane[] = await prisma.$queryRawUnsafe(
    sql.ticket_price_for_plane,
  );

  req.forEach((item) => {
    let tempItem = item;

    tempItem.AveragePrice = serialize(tempItem, "AveragePrice");

    list = [...list, tempItem];
  });

  return list;
}

export const sql = {
  ticket: "SELECT * FROM ticket",
  tickets_during: (month: number[]) =>
    `SELECT * FROM ticket WHERE (Month(Date) BETWEEN ${month[0]} AND ${month[1]})`,
  tickets_more_than: (price: number) =>
    `SELECT * FROM ticket WHERE Value >= ${price}`,
  flights: "SELECT * FROM ticket_flight",
  avia_companies: "SELECT * FROM aviacompany",
  count_tickets: "SELECT COUNT(*) AS Total FROM ticket",
  tickets_average_price: "SELECT AVG(Value) AS AveragePrice FROM ticket",
  tickets_min_and_max_price:
    "SELECT Min(Value) AS MinPrice, Max(Value) AS MaxPrice FROM ticket",
  overall_planes_capacity:
    "SELECT SUM(PlaneCapacity) AS PlanesCapacity FROM aviacompany",
  flights_by_land: (text: string) =>
    `SELECT * FROM ticket_flight WHERE FinallD LIKE "%${text}%"`,
  count_landed_to: (text: string) =>
    `SELECT COUNT(*) AS LandedCount FROM ticket_flight WHERE FinallD LIKE "%${text}%"`,
  group_sold_tickets_by_class:
    "SELECT TicketC, COUNT(*) AS Amount FROM ticket GROUP BY TicketC",
  group_tickets_by_month:
    "SELECT Month(Date) AS Month, AVG(Value) AS AveragePrice FROM ticket GROUP BY Month(Date)",
  group_tickets_sold_by_companies:
    "SELECT CompanyName, COUNT(*) AS SoldTickets FROM aviacompany GROUP BY CompanyName",
  group_flights_by_plane_model:
    "SELECT PlaneModel, COUNT(*) AS FlightsCount FROM aviacompany GROUP BY PlaneModel",
  flights_by_company_name: (text: string) =>
    `SELECT * FROM ticket_flight WHERE CompanyID = (SELECT CompanyID FROM aviacompany WHERE CompanyName LIKE "%${text}%")`,
  find_tickets_by_dest_name: (text: string) =>
    `SELECT * FROM ticket WHERE FlightNum IN (SELECT FlightNum FROM ticket_flight WHERE FinallD LIKE "%${text}%")`,
  find_flights_by_plane: (text: string) =>
    `SELECT COUNT(*) AS TotalFlights FROM ticket_flight WHERE CompanyID = (SELECT CompanyID FROM aviacompany WHERE PlaneModel LIKE "%${text}%")`,
  find_tickets_by_month_and_class: (month: string, ticket_class: string) =>
    `SELECT * FROM ticket WHERE Month(Date) = ${month} AND TicketC LIKE "%${ticket_class}%"`,
  find_tickets_by_dest_and_company_name: (
    destination: string,
    company: string,
  ) =>
    `SELECT * FROM ticket WHERE FlightNum IN (SELECT FlightNum FROM ticket_flight WHERE FinallD LIKE "%${destination}%" AND CompanyID = (SELECT CompanyID FROM aviacompany WHERE CompanyName LIKE "%${company}%"))`,
  tickets_and_tickets_flights:
    "SELECT ticket.*, ticket_flight.* FROM ticket INNER JOIN ticket_flight ON ticket.FlightNum = ticket_flight.FlightNum",
  company_flight_final:
    "SELECT aviacompany.CompanyName, ticket_flight.FlightName, ticket_flight.FinallD FROM aviacompany JOIN ticket_flight ON aviacompany.CompanyID = ticket_flight.CompanyID",
  ticket_price_for_plane:
    "SELECT aviacompany.PlaneModel, AVG(ticket.Value) AS AveragePrice FROM aviacompany JOIN ticket_flight ON aviacompany.CompanyID = ticket_flight.CompanyID JOIN ticket ON ticket.FlightNum = ticket_flight.FlightNum GROUP BY aviacompany.PlaneModel",
};

export const requests = {
  get_tickets,
  get_tickets_during,
  get_tickets_more_than_price,
  count_tickets,
  get_flights,
  get_aviacompanies,
  get_tickets_average_price,
  get_tickets_min_and_max_price,
  get_overall_planes_capacity,
  get_tickets_grouped_by_class,
  get_tickets_price_grouped_by_month,
  get_tickets_sold_by_companies,
  get_flights_count_by_plane_model,
  get_tickets_and_tickets_flights,
  get_company_flight_final,
  get_ticket_price_for_plane,
};
