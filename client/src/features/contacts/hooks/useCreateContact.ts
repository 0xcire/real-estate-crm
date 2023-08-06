import { type UseMutationResult, useMutation } from '@tanstack/react-query';
import { createContact } from '../api';
import { queryClient } from '@/lib/react-query';
import { useToast } from '@/components/ui/use-toast';
import { isAPIError } from '@/utils/error';
import type { NewContact, ContactResponse } from '../types';

export const useCreateContact = (): UseMutationResult<
  ContactResponse,
  unknown,
  NewContact,
  unknown
> => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: createContact,
    onSuccess: (data) => {
      toast({
        description: data.message,
      });
      return queryClient.invalidateQueries({
        queryKey: ['contacts'],
      });
    },
    onError: (error) => {
      if (isAPIError(error)) {
        return toast({
          description: `${error.message}`,
        });
      }
    },
    useErrorBoundary: (error) => isAPIError(error) && error.status >= 500,
  });
};
