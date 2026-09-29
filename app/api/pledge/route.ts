import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

export const dynamic = 'force-dynamic'

const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN

// Setup Redis client if environment variables exist
const redis = redisUrl
  ? new Redis({
      url: redisUrl,
      token: redisToken || '',
    })
  : null

// Fallback in-memory store if Redis is not configured
let globalPledgeCount = 0

export async function GET() {
  try {
    if (redis) {
      const count = await redis.get<number>('pledge_count') || 0
      return NextResponse.json({ count, source: 'redis' })
    }
    return NextResponse.json({ count: globalPledgeCount, source: 'memory', error: 'No redis config' })
  } catch (err: any) {
    return NextResponse.json({ count: globalPledgeCount, source: 'memory-fallback', error: err.message })
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
