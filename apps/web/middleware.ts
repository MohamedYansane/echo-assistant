import { clerkMiddleware , createRouteMatcher} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)"]);

//and we added the sign-in and sign-up in orgFree to avoid infinite loop
// we don't want to mess the user flow and cause infinite loop . So we want the user to lan on this page org-selection without any redirection
const isOrgFreeRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/org-selection(.*)"]);


export default clerkMiddleware(async(auth, request)=>{

  const {userId, orgId} = await auth()

  if(!isPublicRoute(request)){
    await auth.protect()
  }

  if(userId && !orgId && !isOrgFreeRoute(request)){
    const searchParams = new URLSearchParams({redirectUrl:request.url}) ;
    
    const orgSelection = new URL(`/org-selection?${searchParams.toString()}`, request.url);
    
    return NextResponse.redirect(orgSelection);

  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
