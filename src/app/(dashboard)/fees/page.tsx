import { getFeeRecords } from "@/lib/db";
import FeesClient from "./fees-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fees — SIS",
  description:
    "Track fee collection, pending payments, overdue balances, and payment methods.",
};

export default async function FeesPage() {
  const feeRecords = await getFeeRecords();
  return <FeesClient feeRecords={feeRecords} />;
}
