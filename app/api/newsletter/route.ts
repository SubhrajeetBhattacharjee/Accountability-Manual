import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Server-side call to FormSubmit.co.
    // This hides the email address from the public frontend so it can't be scraped.
    const res = await fetch('https://formsubmit.co/ajax/subhrajeetbhattacharjee05@gmail.com', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (res.ok) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
