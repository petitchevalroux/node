import Head from 'next/head'
import ListTyres from '../src/backend/components/list-tyres'
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ListTyres start={0} limit={10}/>
    </div>
  )
}
