'use client';
import {AnimatePresence,motion,useReducedMotion} from 'motion/react';
// Adapted from Motion Primitives TransitionPanel; see THIRD-PARTY-NOTICES.md.
export default function TransitionPanel({activeIndex,children,className=''}:{activeIndex:number;children:React.ReactNode[];className?:string}){
 const reduce=useReducedMotion();
 return <div className={`transition-panel ${className}`}><AnimatePresence initial={false} mode="popLayout"><motion.div key={activeIndex} initial={{opacity:reduce?1:0,y:reduce?0:8}} animate={{opacity:1,y:0}} exit={{opacity:reduce?1:0}} transition={{duration:reduce?0:.28,ease:'easeOut'}}>{children[activeIndex]}</motion.div></AnimatePresence></div>;
}
