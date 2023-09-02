import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Hackathon = () => {
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      router.replace(`/hackathon/${id}/info`)
    }
  }, [id])

  return <div>Redirecting...</div>
}

export default Hackathon
