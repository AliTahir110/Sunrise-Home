'use client';
import {useLayoutEffect,useRef} from 'react';
import gsap from 'gsap';

// React Bits-inspired Split Text entrance, with React-owned spans for safe routing.
const lines=['A safe place','to live.','A brighter future','to build.'];
export default function HeroHeadline(){
 const heading=useRef<HTMLHeadingElement>(null);
 useLayoutEffect(()=>{
  const mm=gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)',()=>{
   gsap.from(heading.current!.querySelectorAll('.split-word'),{yPercent:30,opacity:0,stagger:.055,duration:.65,ease:'power3.out',clearProps:'all'});
  });
  return()=>mm.revert();
 },[]);
 return <h1 ref={heading} className="hero-headline" aria-label="A safe place to live. A brighter future to build."><span className="headline-visual" aria-hidden="true">{lines.map((line,i)=><span key={line} className={`headline-line ${i===2?'headline-accent':''}`}>{line.split(' ').map((word,j)=><span key={`${i}-${j}`} className="split-word">{word}{j<line.split(' ').length-1?'\u00a0':''}</span>)}</span>)}</span></h1>;
}
