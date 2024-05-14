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

import { requests, sql } from "@/lib/sql_requests";

import { aviacompany } from "@prisma/client";

export default async function AviaCompanies() {
  const aviacompanies: Array<aviacompany> = await requests.get_aviacompanies();
  const overall_capacity = await requests.get_overall_planes_capacity();

  return (
    <>
      <code>{sql.avia_companies}</code>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-nowrap">
              Номер компанії
            </TableHead>
            <TableHead className="w-[200px]">Назва компанії</TableHead>
            <TableHead className="w-[125px]">Літак компанії</TableHead>
            <TableHead className="text-right">
              Кількість пасажирських міст
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {aviacompanies.map((company) => (
            <TableRow key={company.CompanyID}>
              <TableCell className="font-medium">{company.CompanyID}</TableCell>
              <TableCell>{company.CompanyName}</TableCell>
              <TableCell>{company.PlaneModel}</TableCell>
              <TableCell className="text-right">
                {company.PlaneCapacity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full flex px-2 mt-4">
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger>
              <p className="text-primary text-sm text-zinc-800">
                Вмісткість всіх літаків разом:{" "}
                <span className="text-black font-medium">
                  {overall_capacity}
                </span>
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p className="bg-zinc-900 text-white rounded-[2px] py-1.5 px-3">
                {sql.overall_planes_capacity}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}
