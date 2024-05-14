export type Ticket = {
  Date: Date;
  FlightNum: number;
  Value: number;
  TicketQ: number;
  TicketC: string;
};

export type Flight = {
  FlightNum: number;
  FlightName: string;
  CompanyID: number;
  FinallD: string;
  Ticket_Id: number;
};
