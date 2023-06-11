import { motion } from "framer-motion";
import { useSnapshot } from "valtio";
import pageStyle from '@/app/_styles/page.module.scss'
import { state } from "@/app/_state";
import classnames from "classnames";

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
    <motion.button {...props} className={classnames(pageStyle['submit-btn'], props.className)} style={style}>
      {children}
    </motion.button>
  )
}
