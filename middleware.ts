import { NextRequest, NextResponse } from 'next/server'

let locales = ['en', 'ru']

function getLocale(req: NextRequest) {
  return 'ru'
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.href.split('/')[3];
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`${locale}`) && pathname !== `${locale}` 
  )

  console.log(pathnameIsMissingLocale)
  
  if (pathnameIsMissingLocale) {
    const locale = getLocale(req)
    return NextResponse.redirect(
      new URL(`/${locale}/${req.nextUrl.href.replace(/^.*?:\/\/.*?(?=\/|$)/,'')}`, req.url)
    )
  }
}

export const config = {
  matcher: [
    '/((?!assets|_next/static|api).*)',
    '/'
  ],
}