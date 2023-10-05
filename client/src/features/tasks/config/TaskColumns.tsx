import { parseISO } from 'date-fns';

// index to clean this up
import { dateIntl } from '@/utils/intl';
import { removeTimeZone } from '@/utils/date';

import { MoreHorizontal } from 'lucide-react';

import { toast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { UpdateTask } from '../components/UpdateTask';
import { DeleteTask } from '../components/DeleteTask';

import type { ColumnDef } from '@tanstack/react-table';
import type { Task } from '../types';

// import { TaskForm } from '../components/TaskForm';

export const taskColumns: Array<ColumnDef<Task>> = [
  // {
  //   id: 'select',
  //   cell: ({ row }): JSX.Element => {
  //     const task = row.original;

  //     return (
  //       <TaskForm
  //         isCheckbox={true}
  //         isCreate={true}
  //         isLoading={updateTask.isLoading}
  //         handleOnCheckedChange={handleOnCheckedChange}
  //         defaultValues={{
  //           completed: task.completed,
  //         }}
  //       />
  //     );
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Desc',
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'dueDate',
    header: 'Due',
    cell: ({ row }): JSX.Element => {
      const dueDate: string = row.getValue('dueDate');

      // TODO: common with Task.tsx
      return dueDate ? (
        <p>{dateIntl.format(parseISO(removeTimeZone(dueDate)))}</p>
      ) : (
        <></>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }): JSX.Element => {
      const task = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 p-0'
            >
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(e): void => {
                e.stopPropagation();
                toast({
                  description: `Task ID: ${task.id}`,
                });
              }}
            >
              Copy task ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e): void => e.stopPropagation()}>
              <UpdateTask
                task={task}
                text='Update Task'
              />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e): void => e.stopPropagation()}>
              <DeleteTask
                id={task.id}
                text='Delete Task'
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
