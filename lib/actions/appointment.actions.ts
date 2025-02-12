"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  database,
  DATABASE_ID,
} from "../appwrite.config";
import { parseStringify } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await database.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.error(
      "An error occurred while registering the appointment: ",
      error
    );
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await database.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "An error occurred while trying to get a appointment: ",
      error
    );
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await database.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduleCount: 0,
      pendingCount: 0,
      canceledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduleCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "canceled":
            acc.canceledCount++;
            break;
        }

        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return data;
  } catch (error) {
    console.error(
      "An error occurred while trying to get the recent appointment list: ",
      error
    );
  }
};

export const updateAppointment = async ({
  appointmentId,
  // userId,
  appointment,
}: // type,
UpdateAppointmentParams) => {
  try {
    console.log({ appointment });
    const updatedAppointment = await database.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }

    // TODO: SMS Notification

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error(
      "An error occurred while trying to update the appointment:",
      error
    );
  }
};
