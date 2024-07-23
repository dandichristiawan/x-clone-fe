import React from 'react'
import { MainLayout } from '@/layout/main-layout'

interface PropsData {
    _id: number,
    username: string
    email: string
}

export const HomePage = () => {
    const [uname, setUname] = React.useState<PropsData[]>()

    React.useEffect(() => {
        async function get() {
            try {
                const res = await fetch('http://192.168.1.153:3000/api/users', {
                    mode: 'cors',
                    method: 'GET',
                    headers: {'Content-Type':'application/json'},
                })
                const data = await res.json()
                setUname(data)
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }
        get()
    }, [])

    return (
        <>
            <MainLayout>
                <main className="flex-1 mx-64 overflow-auto min-h-screen">{uname?.map((i) => (
                    <div className="">{i.username}</div>
                ))}</main>
            </MainLayout>
        </>
    )
}
