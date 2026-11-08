'use client';
import {useEffect,useLayoutEffect,useRef} from 'react';
import {usePathname} from 'next/navigation';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
export default function Animations({children}:{children:React.ReactNode}){
 const root=useRef<HTMLDivElement>(null);const path=usePathname();
 useEffect(()=>{if('scrollRestoration' in history)history.scrollRestoration='manual';let secondFrame=0;const firstFrame=requestAnimationFrame(()=>{secondFrame=requestAnimationFrame(()=>{window.scrollTo({top:0,left:0,behavior:'auto'});ScrollTrigger.clearScrollMemory('manual');ScrollTrigger.refresh()})});return()=>{cancelAnimationFrame(firstFrame);cancelAnimationFrame(secondFrame)}},[path]);
 useLayoutEffect(()=>{gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();const ctx=gsap.context(()=>{
  mm.add('(prefers-reduced-motion: no-preference)',()=>{
   gsap.from('.hero-copy > :not(h1)',{opacity:0,y:18,duration:.7,stagger:.1,clearProps:'all'});
   gsap.from('.hero-image',{scale:1.035,opacity:.65,duration:1.1,clearProps:'all'});
   gsap.from('.page-hero .container > :not(.page-sun)',{opacity:0,y:14,stagger:.08,duration:.5,clearProps:'all'});
   gsap.utils.toArray<HTMLElement>('[data-reveal], .service-detail, .content-split, .values-grid article').forEach(el=>gsap.from(el,{y:24,opacity:0,duration:.65,scrollTrigger:{trigger:el,start:'top 92%',once:true},clearProps:'all'}));
   gsap.utils.toArray<HTMLElement>('[data-image-reveal]').forEach(el=>gsap.from(el,{clipPath:'inset(8% 0 8% 0 round 24px)',duration:1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',once:true},clearProps:'clipPath'}));
  });
 },root);return()=>{mm.revert();ctx.revert()}},[path]);return <div ref={root}>{children}</div>
}
