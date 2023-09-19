import { MoreHorizontal, ArrowUpDown } from 'lucide-react';

import { Avatar } from '@/components';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';

import { DeleteListing } from '../components/DeleteListing';

import { currency, dateIntl, number } from '@/utils/intl';

import type { ColumnDef } from '@tanstack/react-table';
import type { Listing } from '../types';

export const listingColumns: Array<ColumnDef<Listing>> = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'propertyType',
    header: 'Property Type',
  },
  {
    accessorKey: 'price',
    header: ({ column }): JSX.Element => {
      return (
        <Button
          variant='ghost'
          onClick={(): void =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        >
          Price
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }): string => {
      const price: string = row.getValue('price');
      const formatted = currency.format(+price);
      return formatted.split('.')[0] as string;
    },
  },
  {
    accessorKey: 'bedrooms',
    header: ({ column }): JSX.Element => {
      return (
        <Button
          variant='ghost'
          onClick={(): void =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        >
          Beds
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }): JSX.Element => (
      <p className='text-center'>{row.getValue('bedrooms')}</p>
    ),
  },
  {
    accessorKey: 'baths',
    header: ({ column }): JSX.Element => {
      return (
        <Button
          variant='ghost'
          onClick={(): void =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        >
          Baths
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }): JSX.Element => (
      <p className='text-center'>{row.getValue('baths')}</p>
    ),
  },
  {
    accessorKey: 'squareFeet',
    header: ({ column }): JSX.Element => {
      return (
        <Button
          variant='ghost'
          onClick={(): void =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        >
          SqFt
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }): JSX.Element => {
      const sqft: number = row.getValue('squareFeet');
      return <p className='text-center'>{number.format(sqft)}</p>;
    },
  },
  {
    accessorKey: 'contacts',
    header: 'Leads',
    cell: ({ row }): JSX.Element => {
      const leads: Array<string> = row.getValue('contacts');

      return (
        <div className='line-clamp-1 flex'>
          {leads.map(
            (lead, idx) =>
              lead !== 'NULL' && (
                <Avatar
                  key={`${lead}-${idx}`}
                  name={lead}
                />
              )
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }): JSX.Element => {
      return (
        <Button
          variant='ghost'
          onClick={(): void =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        >
          Listed Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }): JSX.Element => {
      const date = new Date(row.getValue('createdAt'));
      return <p className='text-center'>{dateIntl.format(date)}</p>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }): JSX.Element => {
      const listing = row.original;

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
              onClick={(e): Promise<void> => {
                e.stopPropagation();
                toast({
                  description: `Listing ID: ${listing.id} copied to clipboard`,
                });
                return navigator.clipboard.writeText(listing.id.toString());
              }}
            >
              Copy listing ID
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem>View leads</DropdownMenuItem> */}
            {/* <DropdownMenuItem>View listing details</DropdownMenuItem> */}
            {/* <DropdownMenuSeparator /> */}
            {/* <DeleteListing onClick={()} listingID={listing.id} /> */}
            {/* <DropdownMenuItem>
              <DeleteListing listingID={listing.id} />
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
