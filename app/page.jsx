"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

export default function page() {
  const router = useRouter()

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-[10px]">
      <h1 className='font-bold text-3xl text-[#0F172A]'>Welcome Maleesha X</h1>
      <button onClick={() => {
        router.push("/dashboard")
      }}>Go to dashboard</button>
    </div>
  )
}
