import React from "react"
import { prisma } from "@/lib/prisma"

import TripReservation from "./components/TripReservation"
import TripDescription from "./components/TripDescription"
import TripHighlights from "./components/TripHighlights"
import TripLocation from "./components/TripLocation"
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
      <TripReservation
        pricePerDay={trip.pricePerDay as any}
        tripStartDate={trip.startDate}
        tripEndDate={trip.endDate}
        maxGuests={trip.maxGuests}
        tripId={trip.id}
      />

      <TripDescription description={trip.description} />

      <TripHighlights highlights={trip.highlights} />

      <TripLocation
        location={trip.location}
        locationDescription={trip.locationDescription}
      />
    </div>
  )
}

export default TripDetails
