import { NextResponse } from 'next/server'

// import { supabase } from '@/lib/supabase'
import prisma from '@/lib/prisma'

// export async function GET() {
//   const { data, error } = await supabase.from('User').select('*')
//   console.log('data :>> ', data)
//   if (error) {
//     return NextResponse.json({ error }, { status: 500 })
//   }

//   return NextResponse.json(
//     { code: 200, message: 'success', data },
//     { status: 200 }
//   )
// }

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json()
    console.log('name :>> ', username, email)

    // 创建之前先查询
    const target = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    console.log('target :>> ', target)

    if (target) {
      return NextResponse.json({
        code: 409,
        message: 'User already exist!',
      })
    }

    const user = await prisma.user.create({
      data: {
        username,
        password,
        email,
      },
    })
    console.log('user :>> ', user)
    return NextResponse.json({ code: 200, message: 'ok' })
    // return NextResponse.json({ code: 200, message: 'ok', ...user })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
