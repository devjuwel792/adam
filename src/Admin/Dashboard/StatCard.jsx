import { Card } from "@/components/ui/card";

import { cn } from "@/lib/utils";

const colorVariants = {
  teal: "border-l-teal-500 ",
  orange: "border-l-orange-500 ",
  blue: "border-l-blue-500 ",
  green: "border-l-green-500",
};

const iconColorVariants = {
  teal: "text-teal-600",
  orange: "text-orange-600",
  blue: "text-blue-600",
  green: "text-green-600",
};

export function StatCard({ title, value, icon: Icon, color }) {
  return (
    <Card
      style={{
        boxShadow: "0px 4px 6px 0px #0000001A",
        borderTop: "none",
        borderRight: "none",
        borderBottom: "none",
      }}
      className={`border-l-4 p-6 transition-all hover:shadow-md  ${colorVariants[color]}`}
    >
      {/* <div className="flex items-center justify-between "> */}
      <div className="text-center">
        <p className="flex items-center justify-center mb-2">
          <Icon className={`h-8 w-8 ${iconColorVariants[color]}`} />
        </p>
        <p className={cn("text-3xl font-bold text-foreground")}>
          {value}
        </p>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      </div>
      {/* </div> */}
    </Card>
  );
}
