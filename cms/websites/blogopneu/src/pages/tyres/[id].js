import { useRouter } from 'next/router';
import React from 'react';
import ContentTyre from '../../backend/components/content-tyre';
const TyrePage = () => {
  const router = useRouter()
  const { id } = router.query
  return <ContentTyre id={id}/>
}

export default TyrePage
