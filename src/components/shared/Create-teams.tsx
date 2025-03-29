 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddIcon } from "@/icons/add"
import { CreateTeamForm } from "../forms/CreateTeamForm"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useState } from "react"

export const CreateTeams = () => {
    return (
        <Dialog>
        <DialogTrigger asChild>
          <Button className="flex flex-row gap-2"> <AddIcon  className="h-4 w-4"/> Create Teams</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
         <CreateTeamForm />
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

};