import React from 'react'
import { useParams } from 'react-router-dom'
import { PropsData } from './post-detail-types'

export const PostDetail = () => {
  const { id } = useParams()

  const [data, setData] = React.useState<PropsData>()
  const [loading, setLoading] = React.useState<boolean>(false)

  async function getSingle() {
    setLoading(true)
    try {
      const res = await fetch(`http://192.168.103.56:3000/api/post/${id}`, {
        mode: 'cors',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) {
        throw new Error('Something went wrong!')
      }
      const data = await res.json()
      setData(data)
      setTimeout(() => {
        setLoading(false)
      }, 3000)

    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getSingle()
  }, [])

  return (
    <main className="flex-1 md:max-w-lg lg:max-w-2xl xl:max-w-2xl 2xl:max-w-7xl bg-black text-white border border-gray-600 border-t-0 border-b-0 border-r-1 border-l-1 p- justify-center items-center overflow-y-auto min-h-screen">
      <h1>{data?.user.username}</h1>
      <p>{data?.content}</p>
      <p>{data?.likes}</p>
      {data?.replies.map((val) => (
        <>
          <div className="">{val.user.username}</div>
          <div className="">{val.reply}</div>
        </>
      ))}
    </main>
  )
}
