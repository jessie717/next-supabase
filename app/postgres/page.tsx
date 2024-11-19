'use client'
// pages/index.js
// import { useEffect, useState } from 'react'

// interface Response<T> {
//   code: number
//   message: string
//   data: T
// }
// interface User {
//   id: string
//   username: string
//   email: string
// }
export default function Postgres() {
  //   const [users, setUsers] = useState<User[]>([])
  //   const [error, setError] = useState<null | string>(null)

  const onCreateUser = async () => {
    try {
      const params = {
        name: 'jessie2',
        email: 'jessie2@gmail.com',
      }
      // const res = await fetch('/api/postgres', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(params),
      // })
      // console.log('res :>> ', await res.json())

      const data = await fetch('/api/postgres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      const res = await data.json()

      if (res.code === 200) {
        alert('User created successfully!')
      } else if (res.code === 409) {
        alert('User already exits!')
      }
      
    } catch (error) {
      console.log('error :>> ', error)
    }
  }

  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       try {
  //         const response = await fetch('/api/user')
  //         const res = (await response.json()) as Response<User[]>

  //         console.log('res :>> ', res)

  //         if (res.code === 200) {
  //           setUsers(res.data)
  //         } else {
  //           setError(res.message || 'Error fetching users')
  //         }
  //       } catch (err) {
  //         console.log('err :>> ', err)
  //         setError('Network error')
  //       }
  //     }
  //     fetchUsers()
  //   }, [])

  //   if (error) {
  //     return <div>Error: {error}</div>
  //   }

  return (
    <div>
      <h1>Page Postgres</h1>
      <div
        className='w-40 text-2xl border rounded p-2 cursor-pointer'
        onClick={onCreateUser}>
        Create User
      </div>
      {/* <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul> */}
    </div>
  )
}
