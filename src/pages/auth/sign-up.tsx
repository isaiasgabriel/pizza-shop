import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { RegisterRestaurantAPICall } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpForm = z.object({
  email: z.string().email(),
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({})

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: RegisterRestaurantAPICall,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        email: data.email,
        managerName: data.managerName,
        phone: data.phone,
      })
      toast.success('Restaurant registered with success!', {
        action: {
          label: 'Login',
          onClick: () => {
            navigate(`/sign-in?email=${data.email}`)
            // We set the email in the query, so when we access the login page
            // we can use this data to automatically fill the email input
          },
        },
      })
    } catch {
      toast.error('Error registering restaurant,')
    }
  }

  return (
    <>
      <Helmet title="Sign-Up" />
      <div className="p-8">
        <Button variant={'outline'} asChild className="absolute right-8 top-8">
          <Link to={'/sign-in'}>Already registered?</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create free account
            </h1>
            <p className="text-sm text-muted-foreground">
              Be a partner and start selling
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Establishment name:</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              ></Input>
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Your name:</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              ></Input>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Your email:</Label>
              <Input id="email" type="email" {...register('email')}></Input>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Your phone:</Label>
              <Input id="phone" type="tel" {...register('phone')}></Input>
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Register
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              By continuing you agree with our{' '}
              <a href="" className="underline underline-offset-4">
                terms and conditions
              </a>{' '}
              and our{' '}
              <a href="" className="underline underline-offset-4">
                privacy policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
