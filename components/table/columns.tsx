"use client";

import { ColumnDef } from "@tanstack/react-table";

import StatusBadge from "../StatusBadge";
import { Service } from "@/types/appwrite.types";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { formatDateTime } from "@/lib/utils";
import AppointmentModal from "../AppointmentModal";

export const adminColumns: ColumnDef<Service>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.userName}</p>
    ),
  },

  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.$createdAt);
      return (
        <div className="min-w-[115px]">
          <p className="text-14-regular min-w-[100px]">
            {formatDateTime(date.toString()).dateTime}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },

  {
    accessorKey: "reason",
    header: "Request reason",
    cell: ({ row }) => {
      if (row.original.note) {
        return (
          <TooltipProvider delayDuration={0} disableHoverableContent={false}>
            <Tooltip>
              <TooltipTrigger className="cursor-text">
                {row.original.reason}
              </TooltipTrigger>
              <TooltipContent className="shad-tooltip-content">
                <p>I need a rental car!</p>
                <TooltipArrow className="fill-white" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
    },
  },
  {
    accessorKey: "userInfomations",
    header: "User Informations",
    cell: ({ row }) => (
      <Link href={`user-informations/${row.original.userId}`}>
        <p className="text-14-regular min-w-[100px] underline">
          {row.original.userName}
        </p>
      </Link>
    ),
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="approve"
            serviceId={data.userId}
            userId={data.userId}
            service={data}
          />
          <AppointmentModal
            type="cancel"
            serviceId={data.userId}
            userId={data.userId}
            service={data}
          />
        </div>
      );
    },
  },
];

export const userColumns: ColumnDef<Service>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.userName}</p>
    ),
  },

  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.$createdAt);
      return (
        <div className="min-w-[115px]">
          <p className="text-14-regular min-w-[100px]">
            {formatDateTime(date.toString()).dateTime}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },

  {
    accessorKey: "note",
    header: "Note",
    cell: ({ row }) => {
      if (row.original.note) {
        return (
          <TooltipProvider delayDuration={0} disableHoverableContent={false}>
            <Tooltip>
              <TooltipTrigger className="cursor-text">
                I need a...
              </TooltipTrigger>
              <TooltipContent className="shad-tooltip-content">
                <p>I need a rental car!</p>
                <TooltipArrow className="fill-white" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
    },
  },
];
