import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";
interface TranscriptMessage {
    role:"user"|"assistant";
    text:string
}

export const useVapi = ()=>{
    const [vapi,setVapi] = useState<Vapi|null>(null);
    const [isConnected , setIsConnected] = useState(false);
    const [isConnecting , setIsConnecting] = useState(false);
    const [isSpeaking , setIsSpeaking] = useState(false);
    const [transcript , setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(()=>{
        //here we r addin the public key from the vapi dashboard normally each customer must add their own vapi id to be able to use the voice assistant. they have to configure as we did with assistant yansane by following all the step etc...
        const vapiInstance = new Vapi("0f1b9220-9ec3-4613-8b7a-b0f45b425fc9");
        setVapi(vapiInstance);

        vapiInstance.on("call-start", ()=>{
            setIsConnected(true);
            setIsConnecting(false);
            setTranscript([])
        });
        vapiInstance.on("call-end", ()=>{
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false)
        });
        vapiInstance.on("speech-start",()=>{
            setIsSpeaking(true)
        });
        vapiInstance.on("speech-end",()=>{
            setIsSpeaking(false)
        });
        vapiInstance.on("error",(error)=>{
            console.log("VAPI_ERROR: An error occured: ",error);
            setIsConnecting(false)
        });
        vapiInstance.on("message", (message)=>{
            if(message.type ==="transcript" && message.transcriptType === "final"){
                setTranscript((prev)=> [...prev, {
                    role:message.role === "user"?"user":"assistant",
                    text:message.transcript
                }])
            }
        });
        return ()=>{
            vapiInstance?.stop()
        };

        
    },[])
    

    const startCall = () => {
      setIsConnecting(true);
      if (vapi) {
        //let's go to the dashboard of vapi and copy the id of our assistant
        //we r pasting the id just for testing VAPI API normally customer must add their own assistant ID
        vapi.start("59628ac9-c919-4506-88b3-e56dfec2a67e");
      }
    };

    const endCall = ()=>{
        if(vapi){
            vapi.stop()
        }
    }

    return {
        startCall,
        endCall,
        isConnected,
        isConnecting,
        isSpeaking,
        transcript
    }
}