'use client'
import { useState } from 'react'
import Link from 'next/link'

// import Link from 'next/link'
// import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useToast } from '@/hooks/use-toast'

interface RegisterForm {
  username: string
  email: string
  password: string
}

export default function Register() {
  const { toast } = useToast()

  const [form, setForm] = useState<RegisterForm>({
    username: '',
    email: '',
    password: '',
  })

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    setForm({ ...form, [type]: event.target.value })
  }

  // const router = useRouter()
  const onRegister = async () => {
    const data = await fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    const res = await data.json()
    console.log('res :>> ', res)
    if (res.code === 409) {
      toast({
        title: 'Error',
        description: res.message,
      })
      return
    }

    // router.push('/user/register')
  }

  return (
    <>
      <div className='w-full h-full flex flex-col items-center'>
        <div className='w-1/2 xl:w-1/3 mt-40 p-4 border rounded-md shadow hover:shadow-2xl'>
          <div className='text-3xl text-center mb-8'>Register</div>
          <div className='flex flex-col gap-4 my-8'>
            <div className='flex items-center gap-4'>
              <Label htmlFor='username' className='min-w-20'>
                Username:
              </Label>
              <Input
                type='username'
                placeholder='username'
                value={form.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onInputChange(e, 'username')
                }
              />
            </div>
            <div className='flex items-center gap-4'>
              <Label htmlFor='password' className='min-w-20'>
                Password:
              </Label>
              <Input
                type='password'
                placeholder='password'
                value={form.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onInputChange(e, 'password')
                }
              />
            </div>
            <div className='flex items-center gap-4'>
              <Label htmlFor='email' className='min-w-20'>
                email:
              </Label>
              <Input
                type='email'
                placeholder='email'
                value={form.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onInputChange(e, 'email')
                }
              />
            </div>
          </div>
          <div className='flex justify-end gap-4 m-4'>
            <Button variant='outline' onClick={onRegister}>
              Register
            </Button>
            <Link
              href='/user/login'
              className='flex items-center text-blue-300 hover:text-blue-400'>
              To login
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
