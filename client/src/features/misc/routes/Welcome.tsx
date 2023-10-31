import { LinkButton } from '@/components';
import { Typography } from '@/components/ui/typography';
import { useUser } from '@/lib/react-query-auth';

export function Welcome(): JSX.Element {
  const user = useUser();

  const redirectPath = (): string => {
    if (user.data) {
      return '/dashboard';
    }
    return '/auth/signin';
  };
  return (
    <div className='grid h-screen w-full place-items-center'>
      <div className='space-y-2'>
        <Typography variant='h1'>Propel CRM</Typography>
        <Typography variant='p'>
          "Elevate Your Real Estate Success with Our Cutting-Edge CRM Solution."
        </Typography>
        <LinkButton path={redirectPath()}>Get Started</LinkButton>
      </div>
    </div>
  );
}
