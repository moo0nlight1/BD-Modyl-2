// @ts-nocheck

import AviaCompanies from "./views/AviaCompanies";
import Flights from "./views/Flights";
import Tickets from "./views/Tickets";
import TicketsDuring from "./views/client/TicketsDuring";
import FlightsClient, {
  CountFlightsDoneByPlane,
  FlightsByCompany,
  FlightsByDestinationAndCompany,
  FlightsDuringAndClass,
  TicketsByDestination,
} from "./views/client/FlightsClient";
import GroupTickets from "./views/groups/GroupTickets";
import MonthGroupedFlights from "./views/groups/MonthGroupedFlights";
import GroupTicketsSoldByCompanies from "./views/groups/GroupTicketsSoldByCompanies";
import GroupPlanes from "./views/groups/GroupPlanes";
import TicketsAndFlightsComponent from "./views/TicketsAndFlights";
import CompanyFlightFinalComponent from "./views/CompanyFlightFinal";
import TicketPriceForPlaneComponent from "./views/TicketPriceForPlane";

export default async function Home() {
  function Line() {
    return <div className="w-full h-[1px] bg-black/20 my-6"></div>;
  }

  return (
    <main className="mx-auto max-w-[850px] my-3">
      <Tickets />
      <GroupTickets />
      <Line />
      <MonthGroupedFlights />
      <Line />
      <AviaCompanies />
      <GroupPlanes />
      <Line />
      <Flights />
      <FlightsByCompany />
      <Line />
      <GroupTicketsSoldByCompanies />
      <Line />
      <TicketsDuring />
      <Line />
      <Tickets tickets_query="more_than_price" />
      <Line />
      <FlightsClient />
      <Line />
      <TicketsByDestination />
      <Line />
      <CountFlightsDoneByPlane />
      <Line />
      <FlightsDuringAndClass />
      <Line />
      <FlightsByDestinationAndCompany />
      <Line />
      <TicketsAndFlightsComponent />
      <Line />
      <CompanyFlightFinalComponent />
      <Line />
      <TicketPriceForPlaneComponent />
    </main>
  );
}
