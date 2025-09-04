"use client"

import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import {api} from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button";

export default function Page() {

  const users= useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);
  return (
    <>
      <Authenticated>
        <UserButton />
        <div className="flex items-center justify-center min-h-svh">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Apps Web</h1>
            <div className="max-w-sm w-full mx-auto ">
              {JSON.stringify(users, null, 2)}
            </div>

            <Button
              onClick={() => {
                addUser();
              }}
            >
              Add User
            </Button>
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </>
  );
}
