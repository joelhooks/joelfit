import { Clock } from 'lucide-react'

type Task = {
  name: string
  duration?: string
  details?: string
}

type TimelineDay = {
  day: string
  tasks: Task[]
}

type TimelineProps = {
  days: TimelineDay[]
  className?: string
}

export function Timeline({ days, className = "" }: TimelineProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {days.map((day) => (
        <div key={day.day} className="relative">
          {/* Day Header */}
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">{day.day}</h3>
          </div>

          {/* Tasks */}
          <div className="space-y-3 pl-6 border-l border-border">
            {day.tasks.map((task) => (
              <div 
                key={task.name}
                className="relative pl-6"
              >
                {/* Timeline dot */}
                <div 
                  className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary -translate-x-[5px]"
                />
                
                <div className="bg-card border rounded-lg p-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{task.name}</p>
                      {task.details && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {task.details}
                        </p>
                      )}
                    </div>
                    {task.duration && (
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {task.duration}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 