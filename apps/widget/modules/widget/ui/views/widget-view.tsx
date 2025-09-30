"use client"

import {  useAtomValue } from "jotai";

import WidgetAuthScreen from "@/modules/widget/ui/screens/widget-auth-screen";
import { screenAtom } from "@/modules/widget/atoms/widget-atoms";

type Props = {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  //it gonna return the screen 
  const screen = useAtomValue(screenAtom);
  const screenComponents = {
    error: <p>TODO: Error</p>,
    loading: <p>TODO: Loading</p>,
    auth: <WidgetAuthScreen />,
    voice: <p>TODO: Voice</p>,
    inbox: <p>TODO: Inbox</p>,
    selection: <p>TODO: Selection</p>,
    chat: <p>TODO: Chat</p>,
    contact: <p>TODO: Contact</p>,
  };
  return (
    <main className="min-h-screen min-w-screen flex w-full h-full flex-col overflow-hidden rounded-xl border bg-muted">
      {/** we set the default to auth screen like contact-session screen*/}
      {screenComponents[screen]}
    </main>
  );
};