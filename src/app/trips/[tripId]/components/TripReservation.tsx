"use client"
import React from "react"
import DatePicker from "@/components/DatePicker"
import Input from "@/components/Input"
import Button from "@/components/Button"
import { Trip } from "@prisma/client"
import { Controller, useForm } from "react-hook-form"

interface TripReservationProps {
  trip: Trip
}

interface TripReservationForm {
  guests: number
  startDate?: Date | null
  endDate?: Date | null
}

const TripReservation = ({ trip }: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TripReservationForm>()

  const onSubmit = (data: any) => {
    console.log({ data })
  }

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <Controller
          name="startDate"
          rules={{
            required: {
              value: true,
              message: "Data incial é obrigatória",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors?.startDate}
              errorMessage={errors?.startDate?.message}
              onChange={field.onChange}
              selected={field.value}
              placeholderText="Data de ínicio"
              className="w-full"
            />
          )}
        />
        <Controller
          name="endDate"
          rules={{
            required: {
              value: true,
              message: "Data final é obrigatória",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors?.endDate}
              errorMessage={errors?.endDate?.message}
              onChange={field.onChange}
              selected={field.value}
              placeholderText="Data final"
              className="w-full"
            />
          )}
        />
      </div>

      <Input
        {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório.",
          },
        })}
        placeholder={`Número de hóspedes (max: ${trip?.maxGuests})`}
        className="mt-4"
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total:</p>
        <p className="font-medium text-sm text-primaryDarker">R$ 2500,00:</p>
      </div>
      <div className="pb-10 border-b border-grayLighter w-full">
        <Button
          onClick={() => handleSubmit(onSubmit)()}
          className="mt-3 w-full"
        >
          Reservar Agora
        </Button>
      </div>
    </div>
  )
}

export default TripReservation
