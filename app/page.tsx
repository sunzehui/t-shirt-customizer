'use client'
import Intro from './_components/Intro'
import Scene from './_components/Scene'
import Control from './_components/Control'

export default function Home() {
  return (
    <div className='absolute inset-0 h-full w-full z-10'>
      <Intro />
      <Scene />
      <Control />
    </div>
  )
}
