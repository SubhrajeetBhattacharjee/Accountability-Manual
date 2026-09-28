import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

export const dynamic = 'force-dynamic'

// Setup Redis client if environment variables exist
const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null

// Fallback in-memory store if Redis is not configured
let globalPledgeCount = 0

export async function GET() {
  try {
    if (redis) {
      const count = await redis.get<number>('pledge_count') || 0
      return NextResponse.json({ count })
    }
    return NextResponse.json({ count: globalPledgeCount })
  } catch (err) {
    return NextResponse.json({ count: globalPledgeCount })
  }
}

export async function POST() {
  try {
    if (redis) {
      const count = await redis.incr('pledge_count')
      return NextResponse.json({ count })
    }
    globalPledgeCount += 1
    return NextResponse.json({ count: globalPledgeCount })
  } catch (err) {
    globalPledgeCount += 1
    return NextResponse.json({ count: globalPledgeCount })
  }
}
