import { useState } from 'react';

import { useDeleteTask } from '../hooks/useDeleteTask';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  // DialogAction,
  // DialogCancel,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { SubmitButton } from '@/components';

import { handleOnOpenChange } from '@/utils';

// TODO: may need to change to regular dialog to show loading state
export function DeleteTask({
  id,
  text,
}: {
  id: number;
  text?: string;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const deleteTask = useDeleteTask();

  return (
    <Dialog
      open={open}
      onOpenChange={(open): void => handleOnOpenChange(open, setOpen)}
    >
      <DialogTrigger asChild>
        {text ? (
          <p
            onClick={(e): void => e.stopPropagation()}
            className='w-full cursor-pointer'
          >
            {text}
          </p>
        ) : (
          <Button
            variant='destructive'
            className='mr-auto'
          >
            Delete
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogTrigger>
          {/* <DialogAction asChild> */}
          <SubmitButton
            variant='destructive'
            text='Remove'
            isLoading={deleteTask.isLoading}
            onClick={(): void =>
              deleteTask.mutate(id, {
                onSuccess: () => {
                  setOpen(false);
                },
              })
            }
          />
          {/* </DialogAction> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
