"use client"

import { WidgetView } from "@/modules/widget/ui/views/widget-view";
import { use } from "react";

interface PageProps {
  searchParams:Promise<{ organizationId: string }>;
}
const Page = ({ searchParams }: PageProps) => {
  const { organizationId } = use(searchParams);
  //comme le widget view utilisera forcement les hooks use state ben la page devient client component et du coup au lieu de await params jutilise use from react
  if (!organizationId) return <div>No organizationId</div>;
  return <WidgetView organizationId={organizationId} />;
};
export default Page;
