import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { SignInAPICall } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
})

// 'infer' transforms the zod object (signInForm) into a typescript type
type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({})

  // Every POST, PUT, or DELETE request is considered a mutation.
  // Why use this function?
  // Suppose the API is slow or the response is delayed.
  // We can use the "retry" option to attempt the request up to 3 times,
  // ensuring the API is not temporarily offline.
  const { mutateAsync: authenticate } = useMutation({
    mutationFn: SignInAPICall,
  })
  // We are using mutateAsync here because:
  // 1. It integrates the API call into react-query's system, allowing us to easily track
  //    the mutation's state (e.g., loading, success, error).
  // 2. It provides built-in support for retries, ensuring reliability if the API is temporarily unavailable.
  // 3. It enables clean and consistent error handling, making the code more robust.
  // 4. It allows us to leverage react-query's caching features, such as invalidating related queries
  //    after a successful sign-in if needed.

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email })

      toast.success("We've sent an auth link to your email", {
        action: {
          label: 'Resend',
          onClick: () => handleSignIn(data),
        },
      })
    } catch {
      toast.error('Invalid credentials')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        {/*
          asChild makes it possible for the child component to inherit all the properties and styles of the Button.
        */}
        <Button
          asChild
          variant={'outline'}
          className="absolute right-8 top-8"
          // absolute: Positions the button absolutely within its nearest relative parent.
          // right-8: Places the button 2rem (32px) from the right edge of the parent container.
          // top-8: Places the button 2rem (32px) from the top edge of the parent container.
        >
          <Link to={'/sign-up'}>New establishment?</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Access Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your sales through the partner panel
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Your email:</Label>
              <Input id="email" type="email" {...register('email')}></Input>
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Access
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
