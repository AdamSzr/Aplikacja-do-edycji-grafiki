import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Przetwarzanie obrazów</title>
        <meta name="description" content="Aplikacja umożliwiająca przetwarzanie obrazu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <a href="/test">
          idz do strony test
        </a>
        <a href="/image-editor">
          Edycja obrazków
        </a>
      </main>
    </>
  )
}
