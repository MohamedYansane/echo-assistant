"use client"
import { Button } from "@workspace/ui/components/button"
import { useMutation} from "convex/react"
import { api } from "@workspace/backend/_generated/api"
import { useVapi } from "@/modules/widget/hooks/use-vapi"
export default function Page() {
  const {startCall, endCall, isConnected, isConnecting, isSpeaking, transcript} = useVapi()
  const addUser = useMutation(api.users.add);
  return (
    <div className="flex items-center justify-center min-h-svh max-w-md w-full mx-auto">
      <div className="flex flex-col items-center justify-center gap-4">
        <Button onClick={() => startCall()}>Start Call</Button>
        <Button variant="destructive" onClick={() => endCall()}>
          End Call
        </Button>
        <p>isConnected: {`${isConnected}`}</p>
        <p>isConnecting: {`${isConnecting}`}</p>
        <p>isSpeaking: {`${isSpeaking}`}</p>
        <p>{JSON.stringify(transcript, null, 2)}</p>
        <Button onClick={() => addUser()}>Add User</Button>
      </div>
    </div>
  );
}
