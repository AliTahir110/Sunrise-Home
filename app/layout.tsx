import type {Metadata} from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Animations from '@/components/animations';
import {site} from '@/data/site';
export const metadata:Metadata={metadataBase:new URL(site.url),title:{default:'Sunrise Homes Services | Support, Housing, Independence',template:'%s | Sunrise Homes Services'},description:'Welcoming supported accommodation and personalised guidance for young people aged 16+ in the East Midlands.',openGraph:{type:'website',locale:'en_GB',siteName:site.name,images:[{url:'/Brand/sunrise-logo.jpg',width:2048,height:2048}]}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-GB"><body><a href="#main" className="skip-link">Skip to content</a><Header/><Animations><main id="main">{children}</main></Animations><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:site.name,url:site.url,logo:`${site.url}/Brand/sunrise-logo.jpg`,telephone:site.phone,email:site.email,areaServed:'East Midlands',address:{'@type':'PostalAddress',streetAddress:'N B V Enterprise Centre, 6 David Lane',addressLocality:'Nottingham',postalCode:'NG6 0JU',addressCountry:'GB'}})}}/></body></html>}
