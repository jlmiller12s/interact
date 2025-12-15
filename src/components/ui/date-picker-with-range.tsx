"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerWithRangeProps {
    className?: string
    date: DateRange | undefined
    setDate: (date: DateRange | undefined) => void
}

export function DatePickerWithRange({
    className,
    date,
    setDate,
}: DatePickerWithRangeProps) {
    const [internalDate, setInternalDate] = React.useState<DateRange | undefined>(date)
    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => {
        setInternalDate(date)
    }, [date])

    const handleSelect = () => {
        setDate(internalDate)
        setIsOpen(false)
    }

    const handleClear = () => {
        setInternalDate(undefined)
    }

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal bg-white",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>dd/mm/yy - dd/mm/yy</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={internalDate?.from}
                        selected={internalDate}
                        onSelect={setInternalDate}
                        numberOfMonths={2}
                    />
                    <div className="flex items-center justify-end gap-2 p-3 border-t">
                        <Button variant="outline" size="sm" onClick={handleClear} className="rounded-full text-blue-600 border-blue-200 hover:bg-blue-50">
                            Clear
                        </Button>
                        <Button size="sm" onClick={handleSelect} className="rounded-full bg-blue-500 hover:bg-blue-600 text-white">
                            Select
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
