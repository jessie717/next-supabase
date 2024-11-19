import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json()
    console.log('username :>> ', username, email)

    // 检查必填项
    if (!email || !password || !username) {
      return NextResponse.json(
        { message: '所有字段都是必填的', code: 400 },
        { status: 200 }
      )
    }

    // 创建之前先查询e
    const target = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    console.log('target :>> ', target);

    if (target) {
      return NextResponse.json({
        code: 409,
        message: 'User already exist!',
      })
    }

    // 创建新用户
    const user = await prisma.user.create({
      data: {
        username,
        password, // 密码要hash
        email,
      },
    })
    console.log('user :>> ', user)
    return NextResponse.json(
      { code: 200, message: 'ok', ...user },
      { status: 200 }
    )
    // return NextResponse.json({ code: 200, message: 'ok', ...user })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
