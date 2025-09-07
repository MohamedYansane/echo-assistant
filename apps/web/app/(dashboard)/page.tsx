"use client"


import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import {api} from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button";

export default function Page() {

  // const users= useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);
  return (
    <>
        <UserButton />
        {/**i dont want user to have their account as personnal organisation. So,i want to force user to have an orgnisation before they're allowed to used my saas */}
        <OrganizationSwitcher hidePersonal/>
        <div className="flex items-center justify-center min-h-svh">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Apps Web</h1>
            <Button
              onClick={() => {
                addUser();
              }}
            >
              Add User
            </Button>
          </div>
        </div>
    </>
  );
}
