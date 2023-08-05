import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components';
import { cn } from '@/lib/utils';

interface SubmitButtonProps extends ButtonProps {
  text: string;
  isLoading: boolean;
  disabled?: boolean;
}

export const SubmitButton = ({
  text,
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
      // variant={variant}
      className={cn(buttonVariants({ variant, size, className }))}
      type='submit'
    >
      {isLoading && <Spinner variant='xs' />}
      {text}
    </Button>
  );
};
