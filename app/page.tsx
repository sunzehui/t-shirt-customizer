import Intro from '@/components/Intro'
import Scene from '@/components/Scene'
import Control from '@/components/Control'

export default function Home() {
  return (
    <div className='absolute inset-0 h-full w-full z-10'>
      <Intro />
      <Scene />
      <Control />
    </div>
  )
}
