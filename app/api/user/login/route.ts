import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    console.log('email :>> ', email, password)

    // 查询是否为空
    if (!email || !password) {
      return NextResponse.json(
        { message: '所有字段都是必填的', code: 400 },
        { status: 200 }
      )
    }

    // 查询是否注册
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    console.log('user :>> ', user)
    if (user?.password === password) {
      return NextResponse.json({ message: 'ok', code: 200 }, { status: 200 })
    } else {
      return NextResponse.json(
        {
          code: 400,
          message: '用户名或密码有误!',
        },
        { status: 200 }
      )
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}
