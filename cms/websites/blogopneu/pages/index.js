import Head from 'next/head'
import ContentTyre from '../src/backend/components/content-tyre'
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentTyre id={1}></ContentTyre>
    </div>
  )
}
