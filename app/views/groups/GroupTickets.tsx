import { requests, sql } from "@/lib/sql_requests";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function GroupTickets() {
  const group = await requests.get_tickets_grouped_by_class();
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger>
          <div className="flex items-start flex-col">
            {group.map((item, index) => (
              <div key={index}>
                <p className="text-primary text-sm">
                  Кількість білетів класу &quot;{item.TicketC}&quot;:{" "}
                  <span className="text-black font-medium">{item.Amount}</span>
                </p>
              </div>
            ))}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="bg-zinc-900 text-white rounded-[2px] py-1.5 px-3">
            {sql.group_sold_tickets_by_class}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
