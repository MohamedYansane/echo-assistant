"use client"

import { WidgetView } from "@/modules/widget/ui/views/widget-view";
import { use } from "react";

interface PageProps {
  searchParams:Promise<{ organizationId: string }>;
}
const Page = ({ searchParams }: PageProps) => {
  const { organizationId } = use(searchParams);
  //comme le widget view utilisera forcement les hooks use state ben la page devient client component et du coup au lieu de await params jutilise use from react

  //important le searchparams est different de params quand tu passses comme props params il te printera jamis l'id si tu passes localhost:3003/?organizationId=1234 car le params n'est que pour les routes dynamiques
  //le searchparams lui recupere tout ce qui est dans l'url apres le ? et le met dans un objet
  //donc si tu passes localhost:3003/?organizationId=1234 ben le searchparams sera {organizationId:1234}
  //et si tu passes localhost:3003/?organizationId=1234&foo=bar ben le searchparams sera {organizationId:1234, foo:bar}
  //et si tu passes localhost:3003/ ben le searchparams sera {}
  //donc faut tjrs verifier si la propriete existe avant de l'utiliser
  // if (!organizationId) return <div>No organizationId</div>;
  return <WidgetView organizationId={organizationId} />;
};
export default Page;
