import { Button, buttonVariants } from '@/components/ui/button';
import { Spinner } from '@/components';

import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';
import type { ButtonProps } from '@/components/ui/button';

interface SubmitButtonProps extends ButtonProps {
  children: ReactNode;
  isLoading: boolean;
  disabled?: boolean;
}

export const SubmitButton = ({
  children,
  isLoading,
  disabled,
  size,
  variant,
  className,
  ...props
}: SubmitButtonProps): JSX.Element => {
  return (
    <Button
      {...props}
      disabled={isLoading || disabled}
      aria-disabled={isLoading || disabled}
      className={cn(buttonVariants({ variant, size, className }))}
      type='submit'
    >
      {isLoading && <Spinner />}
      <span className={isLoading ? 'ml-1' : ''}>{children}</span>
    </Button>
  );
};
