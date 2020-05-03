import Head from 'next/head'
import ContentTire from '../src/backend/components/content-tire'
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentTire id={1}></ContentTire>
    </div>
  )
}
