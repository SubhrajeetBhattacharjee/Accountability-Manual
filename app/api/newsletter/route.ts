import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Server-side call to FormSubmit.co.
    const referer = request.headers.get('referer') || 'https://theaccountabilitymanual.vercel.app/'
    const origin = request.headers.get('origin') || 'https://theaccountabilitymanual.vercel.app'

    const res = await fetch('https://formsubmit.co/ajax/subhrajeetbhattacharjee05@gmail.com', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': referer,
        'Origin': origin,
      },
      body: JSON.stringify({ email, _captcha: "false" }),
    })

    const text = await res.text()
    let data: any = {}
    try {
      data = JSON.parse(text)
    } catch {
      // If FormSubmit returns HTML or empty, assume success if res.ok
      if (res.ok) return NextResponse.json({ success: true })
      return NextResponse.json({ error: 'Invalid response from FormSubmit' }, { status: 500 })
    }

    // FormSubmit returns { success: "false" } (as a string) when it fails, but status code might be 200.
    if (res.ok && data.success !== 'false' && data.success !== false) {
      return NextResponse.json({ success: true })
    } else {
      // If it's the activation message, treat it as a success for the user to not confuse them
      if (data.message && data.message.includes('Activation')) {
        return NextResponse.json({ success: true, message: 'needs_activation' })
      }
      return NextResponse.json({ error: data.message || 'Failed to submit' }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error', details: error.message || String(error) }, { status: 500 })
  }
}
