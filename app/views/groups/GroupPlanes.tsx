import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requests, sql } from "@/lib/sql_requests";

export default async function GroupPlanes() {
  const planes: Array<{ PlaneModel: string; FlightsCount: string }> =
    await requests.get_flights_count_by_plane_model();

  return (
    <>
      <div className="my-4">
        <code>{sql.group_flights_by_plane_model}</code>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-nowrap">Літак</TableHead>
            <TableHead className="w-[260px]">Кількість рейсів</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {planes.map((plane, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{plane.PlaneModel}</TableCell>
              <TableCell className="font-medium">
                {plane.FlightsCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
