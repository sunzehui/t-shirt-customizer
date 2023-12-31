'use client'
import pageStyle from '@/app/_styles/intro.module.scss'
import { AnimatePresence, motion } from "framer-motion"
import { useSnapshot } from 'valtio'
import { state } from '@/app/_state'
import { useCallback } from 'react'
import ColorfullButton from './ColorfullButton'
import { animationBound, animationSlide } from '@/app/_animation'


export default function Home() {
  const snap = useSnapshot(state)

  const handleSubmitClick = useCallback(() => {
    state.isIntroed = true
  }, [])

  const handleAnimationComplete = useCallback(() => {
    state.loaded = true
  }, [])
  return (
    <AnimatePresence>
      {snap.isIntroed ? null :
        <motion.div className={pageStyle['page-intro']}>
          <motion.div className={pageStyle['page-intro-wrap']}>
            <motion.header
              {...animationSlide('left')}
              onAnimationComplete={handleAnimationComplete}
            >
              <img className={`h-8 w-8 `} src="/threejs.png" alt="" />
            </motion.header>
            <motion.main className={pageStyle['page-intro--main']}>
              <motion.h1 {...animationBound('left')} className={pageStyle['page-main-title']}>现在定制<span className='inline-block' >T恤！</span></motion.h1>
              <motion.div {...animationSlide('left')}>
                <motion.div className={pageStyle['text-desc']}>
                  使用我们全新的3D定制工具，打造您独特的专属衬衫。
                  <br />
                  <strong>释放你的想象力</strong>
                  ，定义你自己的风格。
                </motion.div>
                <ColorfullButton className={pageStyle['page-intro--submit-btn']} onClick={handleSubmitClick}>开始定制</ColorfullButton>
              </motion.div>
            </motion.main>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>
  )
}
