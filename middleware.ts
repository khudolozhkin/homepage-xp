import { NextRequest, NextResponse } from 'next/server'

let locales = ['en', 'ru']

function getLocale(req: NextRequest) {
  const acceptLang = req.headers.get('accept-language')?.split("");
  if (acceptLang?.slice(0,2).join('') == 'ru') 
  {
    return 'ru'
  } else {
    return 'en'
  }
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.href.split('/')[3];
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`${locale}`) && pathname !== `${locale}` 
  )
  
  if (pathnameIsMissingLocale) {
    const locale = getLocale(req)
    return NextResponse.redirect(
      new URL(`/${locale}/${req.nextUrl.href.replace(/^.*?:\/\/.*?(?=\/|$)/,'')}`, req.url)
    )
  }
}

export const config = {
  matcher: [
    '/((?!assets|_next/|api).*)',
    '/'
  ],
}