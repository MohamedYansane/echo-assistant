import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { WidgetHeader } from "../components/widget-header";

import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Doc } from "@workspace/backend/_generated/dataModel";



const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("enter a valid email"),
});

//Temporay id before we add state management
const organizationId = "org_31ZIGLmlabbstDnhx5uxT0Xw4Yt";
const WidgetAuthScreen = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            email:""
        }
    });

    const createContactSession = useMutation(api.public.contactSession.create);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if(!organizationId) return;
        // i'm giving it the type Doc of the metaData from the schema.ts file
        const metaData: Doc<"contactSessions">["metaData"] = {
           userAgent: navigator.userAgent,
           language: navigator.language,
           languages: navigator.languages?.join(","),
           platform: navigator.platform,
           vendor: navigator.vendor,
           screenResolution: `${screen.width}x${screen.height}`,
           viewportSize: `${window.innerWidth}x${window.innerHeight}`,
           timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
           timezoneOffset: new Date().getTimezoneOffset(),
           cookieEnabled: navigator.cookieEnabled,
           referrer: document.referrer || "direct",
           currentUrl: window.location.href,
         };

         const contactSessionId = await createContactSession({
            ...values, organizationId, metaData
         })
         console.log(contactSessionId);
    }
    return (
      <>
        <WidgetHeader>
          <div className="font-semibold flex flex-col justify-between gap-y-2 px-2 py-6">
            <p className="text-3xl">Hi there! 👋</p>
            <p className="text-lg">let's get you started</p>
          </div>
        </WidgetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col gap-y-4 p-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="h-10 bg-background"
                      placeholder="Name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="h-10 bg-background"
                      placeholder="Email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={form.formState.isSubmitting}
              size="lg"
              type="submit"
            >
              Continue
            </Button>
          </form>
        </Form>
      </>
    );
}
 
export default WidgetAuthScreen;