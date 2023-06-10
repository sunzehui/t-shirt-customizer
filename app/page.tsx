import Intro from '@/app/_components/Intro'
import Scene from '@/app/_components/Scene'
import Control from '@/app/_components/Control'

export default function Home() {
  return (
    <div className='absolute inset-0 h-full w-full z-10'>
      <Intro />
      <Scene />
      <Control />
    </div>
  )
}
