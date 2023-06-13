'use client'
import { useSnapshot } from "valtio";
import { state } from "@/app/_state";
import ColorfullButton from "./ColorfullButton";
import { AnimatePresence, motion } from "framer-motion";
import { animationSlide } from "@/app/_animation";
import pageStyle from "@/app/_styles/control.module.scss";
import { FC, useState } from "react";
import { ColorTab, UploadTab, AITab } from "./TabContent";
import { useClickAway } from "@uidotdev/usehooks";
import classNames from "classnames";
import { TabContentProps, TabItemProps, TabsProps, TabItem, TabType } from "@/types/tabs";

const Tabs: FC<TabsProps> = ({ list, onChange, ...props }) => {
  return (
    <ul className={classNames(`menu bg-base-200 rounded-box`, props.className)}>
      {
        list.map((item, idx) => {
          return <TabItem onClick={() => onChange(item, idx)} key={item.name} item={item}></TabItem>
        })
      }
    </ul>
  )
}

const TabItem: FC<TabItemProps> = ({ item, ...props }) => {
  return (
    <li {...props}>
      <a className="tooltip tooltip-right p-1" data-tip={item.name}>
        <img src={item.url} alt="" />
      </a>
    </li>
  )
}

const swapBtnMap = {
  logo: {
    url: '/logo-t-shirt.png',
  },
  '贴图': {
    url: '/texture-t-shirt.png'
  }
}
const SwapButton: FC<{ type: TabType }> = ({ type }) => {
  const btnShowType = (type === 'logo' ? 'isLogoShow' : 'isTextureShow') as 'isLogoShow' | 'isTextureShow'
  const focusStyle = {
    backgroundColor: 'red',
  }
  const snap = useSnapshot(state)
  const isBtnFocus = snap[btnShowType]

  const handleClick = () => {
    state[btnShowType] = !snap[btnShowType]
  }

  return (
    <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center" onClick={handleClick}>
      <img src={swapBtnMap[type].url} alt="" className="swap-off" style={isBtnFocus ? focusStyle : {}} />
    </div>
  )
}

const TabContent: FC<TabContentProps> = ({ value: tabItem, _ref: ref }) => {
  const Content = () => {
    if (tabItem === null) return null
    if (tabItem.name === 'color') return <ColorTab />
    if (tabItem.name === 'upload') return <UploadTab />
    if (tabItem.name === 'AI') return (<AITab />)
    return null
  }
  const contentEl = Content()
  if (!contentEl) return null
  const Wrap = () => (
    <motion.div className={pageStyle['tab-content']} ref={ref}>
      {contentEl}
    </motion.div>
  )
  return <>
    <Wrap />
  </>
}
const Control: FC = () => {
  const snap = useSnapshot(state)

  const handleBackBtnClick = () => {
    state.isIntroed = false
  }
  const tabList = [
    {
      name: 'color',
      url: '/color_board.svg'
    },
    {
      name: 'upload',
      url: '/upload.svg'
    },
    {
      name: 'AI',
      url: '/openai.svg'
    }
  ]
  const [activeTab, setActiveTab] = useState<TabItem>(null!)
  const [isTabContentShow, setIsTabContentShow] = useState(false)
  const handleTabChange = (item: TabItem) => {
    console.log('tab change', item);
    setActiveTab(item)
    setIsTabContentShow(true)
  }
  const tabContentRef = useClickAway(() => {
    setIsTabContentShow(false);
  });
  return (
    <AnimatePresence>
      {snap.isIntroed ?
        <>
          <motion.div className="absolute right-8 top-8" {...animationSlide('right')}>
            <ColorfullButton onClick={handleBackBtnClick}>返回</ColorfullButton>
          </motion.div>

          <motion.div className={pageStyle['sidebar']} {...animationSlide('left')}>
            <motion.div className={pageStyle['tabs-layout']}>
              <Tabs className={pageStyle['tabs']} list={tabList} onChange={handleTabChange} />
              {isTabContentShow && <TabContent _ref={tabContentRef} value={activeTab} />}
            </motion.div>

          </motion.div>

          <motion.div className={pageStyle['footer']} {...animationSlide('bottom')}>
            <SwapButton type="logo" />
            <SwapButton type="贴图" />
          </motion.div>
        </>

        : null
      }
    </AnimatePresence>
  )
}
export default Control
