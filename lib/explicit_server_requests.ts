"use server";

import { Flight, Ticket } from "@/types/Ticket";
import { PrismaClient } from "@prisma/client";
import { sql } from "./sql_requests";
import { serialize } from "./utils";

const prisma = new PrismaClient();

export async function get_server_tickets_during(
  period: "winter" | "autumn" | "spring" | "summer",
): Promise<Ticket[]> {
  const get_period = {
    autumn: [9, 11],
    winter: [12, 2],
    spring: [3, 5],
    summer: [6, 8],
  };
  const response = await prisma.$queryRawUnsafe(
    sql.tickets_during(get_period[period]),
  );
  return response as Ticket[];
}

export async function get_server_flights(): Promise<Flight[]> {
  return await prisma.$queryRawUnsafe(sql.flights);
}

export async function get_server_flights_by_land(
  text: string,
): Promise<Flight[]> {
  return await prisma.$queryRawUnsafe(sql.flights_by_land(text));
}

export async function get_server_count_flights_by_land(
  text: string,
): Promise<string> {
  const req: Flight[] = await prisma.$queryRawUnsafe(sql.count_landed_to(text));

  return serialize(req, "LandedCount");
}

export async function get_server_flights_by_company_name(
  text: string,
): Promise<Flight[]> {
  const req: Flight[] = await prisma.$queryRawUnsafe(
    sql.flights_by_company_name(text),
  );
  return req;
}

export async function get_tickets_by_destination_name(text: string) {
  const req: Ticket[] = await prisma.$queryRawUnsafe(
    sql.find_tickets_by_dest_name(text),
  );

  return req;
}

export async function get_flights_by_plane(text: string) {
  const req: any = await prisma.$queryRawUnsafe(
    sql.find_flights_by_plane(text),
  );

  return serialize(req, "TotalFlights");
}

export async function get_tickets_by_month_and_class(
  month: string,
  ticket_class: string,
): Promise<Array<Ticket>> {
  const req: Ticket[] = await prisma.$queryRawUnsafe(
    sql.find_tickets_by_month_and_class(month, ticket_class),
  );

  return req;
}

export async function get_tickets_by_dest_and_company_name(
  destination: string,
  company: string,
) {
  const req: Ticket[] = await prisma.$queryRawUnsafe(
    sql.find_tickets_by_dest_and_company_name(destination, company),
  );

  return req;
}
