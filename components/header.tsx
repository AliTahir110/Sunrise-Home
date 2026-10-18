'use client';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {Menu,X,ArrowUpRight} from 'lucide-react';
import {navigation} from '@/data/site';
export function Logo(){return <span className="logo-window"><Image src="/Brand/sunrise-logo.jpg" alt="Sunrise Homes Services — Support, Housing, Independence" width={2048} height={2048} priority/></span>}
export default function Header(){
 const [open,setOpen]=useState(false);const [compact,setCompact]=useState(false);const path=usePathname();
 useEffect(()=>{const change=()=>setCompact(window.scrollY>30);change();window.addEventListener('scroll',change,{passive:true});return()=>window.removeEventListener('scroll',change)},[]);
 useEffect(()=>{const desktop=window.matchMedia('(min-width: 951px)');const close=()=>{if(desktop.matches)setOpen(false)};desktop.addEventListener('change',close);return()=>desktop.removeEventListener('change',close)},[]);
 return <header className={`header ${compact?'compact':''}`}><div className="nav-inner"><Link href="/" aria-label="Sunrise Homes Services home"><Logo/></Link><nav className="desktop-navigation" aria-label="Main navigation">{navigation.map(([label,href])=><Link key={href} href={href} aria-current={path===href?'page':undefined}>{label}</Link>)}</nav><Link className="nav-cta" href="/contact">Make an Enquiry <ArrowUpRight size={15}/></Link><Dialog.Root open={open} onOpenChange={setOpen}><Dialog.Trigger asChild><button className="menu-toggle" aria-label="Open navigation"><Menu/></button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="dialog-overlay mobile-overlay"/><Dialog.Content className="mobile-sheet"><div className="mobile-sheet-top"><Dialog.Title className="mobile-title">Explore Sunrise</Dialog.Title><Dialog.Close className="icon-button" aria-label="Close navigation"><X/></Dialog.Close></div><Dialog.Description className="mobile-description">A place to belong. A future to build.</Dialog.Description><nav aria-label="Mobile navigation">{navigation.map(([label,href],i)=><Link key={href} href={href} aria-current={path===href?'page':undefined} onClick={()=>setOpen(false)} style={{'--item-index':i} as React.CSSProperties}><span><small>0{i+1}</small>{label}</span><ArrowUpRight size={19}/></Link>)}</nav><Link className="button" href="/contact" onClick={()=>setOpen(false)}>Let’s Talk <ArrowUpRight size={17}/></Link><p className="mobile-signoff">SUPPORT · HOUSING · INDEPENDENCE</p></Dialog.Content></Dialog.Portal></Dialog.Root></div></header>
}
