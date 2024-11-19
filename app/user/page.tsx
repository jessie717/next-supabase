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
        const response = await fetch('/api/user')
        const res = (await response.json()) as Response<User[]>

        console.log('res :>> ', res)

        if (res.code === 200) {
          setUsers(res.data)
        } else {
          setError(res.message || 'Error fetching users')
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
      <h1>Page User</h1>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.id}: {user.username}-{user.email}</li>
        ))}
      </ul>
    </div>
  )
}
