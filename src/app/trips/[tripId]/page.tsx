import { prisma } from "@/lib/prisma"
import React from "react"
import TripHeader from "./components/TripHeader"

const GetTripDetails = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  })
  return trip
}

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
  const trip = await GetTripDetails(params.tripId)
  if (!trip) return null
  return (
    <div className="container mx-auto">
      <TripHeader trip={trip} />
    </div>
  )
}

export default TripDetails
