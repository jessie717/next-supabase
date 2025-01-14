'use client'
// pages/index.js
import { useEffect, useState } from 'react'

interface Response<T> {
  code: number
  message: string
  data: T
}
interface User {
  id: string
  username: string
  email: string
}

export default function User() {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user') // 调用 API 路由
        const data = (await response.json()) as Response<User[]>

        if (data.code === 200) {
          setUsers(data.data)
        } else {
          setError(data.message || 'Error fetching users')
        }
      } catch (err) {
        console.log('err :>> ', err)
        setError('Network error')
      }
    }
    fetchUsers()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Page root</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id}-{user.username}-{user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
