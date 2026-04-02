"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<string, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

function ChartContainer({
  id: _id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ReactNode;
}) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <RechartsPrimitive.ResponsiveContainer>
          {children as any}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  className,
  label,
  labelFormatter,
  labelClassName,
}: any) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className={cn("bg-white border p-2 rounded shadow-lg", className)}>
      {label && <div className={cn("font-bold", labelClassName)}>{labelFormatter ? labelFormatter(label, payload) : label}</div>}
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex justify-between gap-4">
          <span>{item.name}:</span>
          <span className="font-mono">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({ payload, className }: any) {
  if (!payload?.length) return null;
  return (
    <div className={cn("flex gap-4 justify-center", className)}>
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex items-center gap-1">
          <div className="w-2 h-2" style={{ backgroundColor: item.color }} />
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};