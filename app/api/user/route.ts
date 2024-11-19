// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server'

import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase.from('User').select('*')
console.log('data :>> ', data);
  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json(
    { code: 200, message: 'success', data },
    { status: 200 }
  )
}

// export async function POST(request: Request) {}
