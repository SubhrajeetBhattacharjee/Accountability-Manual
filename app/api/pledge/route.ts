import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// In-memory store for the pledge count.
let globalPledgeCount = 0

export async function GET() {
  return NextResponse.json({ count: globalPledgeCount })
}

export async function POST() {
  globalPledgeCount += 1
  return NextResponse.json({ count: globalPledgeCount })
}
