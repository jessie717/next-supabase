'use client'
import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

interface LoginForm {
  email: string
  password: string
}

export default function Login() {
  const router = useRouter()

  const { toast } = useToast()

  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  })

  const onFormChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    setForm({ ...form, [type]: event.target.value })
  }

  const onLogin = async () => {
    console.log('form :>> ', form)
    const data = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    const res = await data.json()
    console.log('res :>> ', res)
    if (res.code === 200) {
      toast({
        title: 'Success',
        description: res.message,
      })
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } else {
      toast({
        title: 'Error',
        description: res.message,
      })
    }
  }

  return (
    <>
      <div className='w-full h-full flex flex-col items-center'>
        <div className='w-1/2 xl:w-1/3 mt-40 p-4 border rounded-md shadow hover:shadow-2xl'>
          <div className='text-3xl text-center mb-8'>Login</div>
          <div className='flex flex-col gap-4 my-8'>
            <div className='flex items-center gap-4'>
              <Label htmlFor='email' className='min-w-20'>
                Email:
              </Label>
              <Input
                type='email'
                placeholder='email'
                value={form.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onFormChange(e, 'email')
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
                  onFormChange(e, 'password')
                }
              />
            </div>
          </div>
          <div className='flex justify-end gap-4 m-4'>
            <Button onClick={onLogin}>Login</Button>
            {/* <Button variant='outline' onClick={onRegister}>
              Register
            </Button> */}
            <Link
              href='/user/register'
              className='flex items-center text-blue-300 hover:text-blue-400 hover:underline'>
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
