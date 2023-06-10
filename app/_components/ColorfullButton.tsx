import { motion } from "framer-motion";
import { useSnapshot } from "valtio";
import pageStyle from '@/app/_styles/page.module.scss'
import { state } from "@/app/_state";

interface ColorfullButtonProps {
  children: React.ReactNode;
  // html properties
  [key: string]: any;
}
export default function ColorfullButton({ children, ...props }: ColorfullButtonProps) {
  const snap = useSnapshot(state)
  const style = {
    backgroundColor: snap.color,
    color: '#fff'
  }

  return (
    <motion.button {...props} className={pageStyle['submit-btn']} style={style}>
      {children}
    </motion.button>
  )
}
