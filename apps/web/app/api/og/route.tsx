import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
 
export const runtime = 'edge'
 
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
 
    // ?title=<title>
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'JoelFit'
 
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            background: 'linear-gradient(to bottom right, #FFFFFF, #F3F4F6)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 50px',
              textAlign: 'center',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
                marginBottom: 16,
                color: '#1F2937',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 400,
                color: '#6B7280',
                marginTop: 8,
              }}
            >
              Evidence-based fitness & rehabilitation
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
} 