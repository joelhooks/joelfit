"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts"
import { cn } from "../../lib/utils"

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
  }
}

interface ChartProps {
  config: ChartConfig
  children: React.ReactElement
}

function Chart({ config, children }: ChartProps) {
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

interface ChartTooltipProps extends Omit<TooltipProps<any, any>, "children"> {
  hideLabel?: boolean
  labelKey?: string
  labelFormatter?: (label: string) => string
}

const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  ChartTooltipProps
>(
  (
    {
      active,
      payload,
      label,
      hideLabel,
      labelFormatter,
      labelKey,
    },
    ref
  ) => {
    if (!active || !payload?.length) {
      return null
    }

    const tooltipLabel = labelFormatter ? labelFormatter(label as string) : label

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-background px-3 py-2 text-sm shadow-md"
        )}
      >
        {!hideLabel && tooltipLabel && <div className="mb-2">{tooltipLabel}</div>}
        <div className="flex flex-col gap-1">
          {payload.map((item: any, index: number) => {
            return (
              <div className="flex items-center gap-2" key={index}>
                <div
                  className={cn("h-2 w-2 rounded-full", {
                    [`bg-[${item.fill}]`]: item.fill,
                  })}
                />
                <span className="text-muted-foreground">
                  {item.name}:
                </span>
                <span>{item.value}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltip.displayName = "ChartTooltip"

export {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Chart,
  ChartTooltip,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
}
