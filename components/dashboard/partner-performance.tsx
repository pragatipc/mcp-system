"use client"

import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const partnerPerformance = [
  {
    name: "Amit Singh",
    initials: "AS",
    completedOrders: 42,
    totalOrders: 45,
    performance: 93,
  },
  {
    name: "Raj Kumar",
    initials: "RK",
    completedOrders: 38,
    totalOrders: 40,
    performance: 95,
  },
  {
    name: "Neha Gupta",
    initials: "NG",
    completedOrders: 35,
    totalOrders: 40,
    performance: 88,
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    completedOrders: 32,
    totalOrders: 38,
    performance: 84,
  },
  {
    name: "Vikram Patel",
    initials: "VP",
    completedOrders: 30,
    totalOrders: 36,
    performance: 83,
  },
]

export function PartnerPerformance() {
  return (
    <div className="space-y-4">
      {partnerPerformance.map((partner) => (
        <div key={partner.name} className="flex items-center space-x-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{partner.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{partner.name}</p>
              <span className="text-sm text-muted-foreground">
                {partner.completedOrders}/{partner.totalOrders}
              </span>
            </div>
            <Progress value={partner.performance} className="h-2" />
          </div>
        </div>
      ))}
    </div>
  )
}
