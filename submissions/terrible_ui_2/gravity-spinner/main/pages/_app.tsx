import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Button, createTheme, NextUIProvider, Text } from "@nextui-org/react"
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import Head from 'next/head';

const darkTheme = createTheme({
  type: 'dark',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>Phone Number App - Call Your Friends</title>
        <meta name='description' content='Phone your friends in milliseconds from across the globe. Missing a conversation is like missing an opportunity.' />
        <meta name='keywords' content='phone, calling, call, friends, contact' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='hsl(0deg 0% 6%)' />
        <link rel='icon' type='image/ico' href='/logo.svg' />
        <link rel='apple-touch-icon' href='/logo.svg' />
        <meta name='HandheldFriendly' content='True' />
        {/* Open Graphics */}
        <meta property='og:site_name' content='Phone Number App' />
        <meta property='og:url' content='https://badui-phone-input.web.app/' />
        <meta property='og:keywords' content='phone, calling, call, friends, contact' />
        <meta property='og:locale' content='en-US' />
        <meta property='og:type' content='website' />
        <meta property='og:image:url' content='/logo.svg' />
        <meta property='og:image:alt' content='Phone Number App logo' />
        <meta property='og:image:type' content='image/svg' />
        <meta property='og:title' content='Phone Number App - Call Your Friends' />
        <meta property='og:description' content='Phone your friends in milliseconds from across the globe. Missing a conversation is like missing an opportunity.' />
        {/* Twitter */}
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:image' content='/logo.svg' />
        <meta name='twitter:image:alt' content='Phone Number App logo' />
        <meta name='twitter:title' content='Phone Number App - Call Your Friends' />
        <meta name='twitter:description' content='Phone your friends in milliseconds from across the globe. Missing a conversation is like missing an opportunity.' />
      </Head>
      <ThemeProvider defaultTheme='dark' attribute='class' value={{dark: darkTheme.className}}>
        <NextUIProvider>
          <header>
            <Text h3={true} style={{textAlign: 'center', padding: '0.5em 0em'}}>Phone Number App</Text>
            <nav style={{display: 'flex', gap: '1em'}}>
              <Button ghost={true} disabled={true} auto={true} size='sm'>Home</Button>
              <Button ghost={true} disabled={true} auto={true} size='sm'>Blog</Button>
              <Link passHref={true} href='/'>
                <Button ghost={true} auto={true} size='sm'>Sign In</Button>
              </Link>
            </nav>
          </header>
          <Component {...pageProps} />
        </NextUIProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
