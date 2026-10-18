'use client';
import Link from 'next/link';
import Image from 'next/image';
import {motion,useReducedMotion} from 'motion/react';
import {ArrowUpRight} from 'lucide-react';
import {services} from '@/data/site';
import {Icon} from './ui';
// Magic UI's bento composition: a featured background, content and persistent CTA.
export default function ServiceBento(){const reduce=useReducedMotion();return <div className="service-bento">{services.map((service,i)=><motion.article key={service.title} className={`bento-card bento-${i}`} whileHover={reduce?{}:{y:-4}} transition={{duration:.22}}><Link href={`/services#service-${i+1}`} className="bento-link">{i===0&&<div className="bento-photo"><Image src="/images/living-room.jpg" alt="" fill sizes="(max-width: 760px) 100vw, 60vw"/><span>Illustrative interior</span></div>}<div className="bento-content" data-reveal><div className="service-top"><Icon name={service.icon}/><span>0{i+1}</span></div><h3>{service.title}</h3><p>{service.text}</p><span className="learn-more">Explore this support <span className="arrow-circle"><ArrowUpRight size={18}/></span></span></div>{i===1&&<div className="bento-steps" aria-hidden="true"><span>Small steps</span><span>Growing confidence</span><span>New possibilities</span></div>}{i===3&&<div className="bento-orbits" aria-hidden="true"/>}</Link></motion.article>)}</div>}
