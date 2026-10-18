'use client';
import * as Accordion from '@radix-ui/react-accordion';
import {Plus} from 'lucide-react';
import {Eyebrow,Button} from './ui';
const questions=[
 ['Who does Sunrise support?','Sunrise supports young people aged 16–25, working with local authorities to discuss accommodation and floating support. Placement suitability and availability are confirmed individually.'],
 ['How do I discuss a referral?','Email referrals@sunrisehomesservices.com to start a planned-placement conversation. For urgent placement enquiries, call 07492 194419 (24 hours). Please agree a secure way to share sensitive case details with the team.'],
 ['Can a young person visit before moving in?','For planned placements, young people are invited to visit the houses and meet the team. Contact Sunrise to arrange a suitable time and discuss the next steps.'],
 ['What practical support is available?','Support includes everyday skills such as budgeting, cooking, household routines and accessing education, employment and local health services. The support plan reflects individual needs.'],
 ['Are the interior photographs actual Sunrise homes?','The photographs currently displayed are illustrative interiors, not Sunrise properties. Contact the team for verified property information, current availability and viewing arrangements.']
];
// shadcn/ui Accordion composition, styled for Sunrise rather than the default theme.
export default function FAQ(){return <section className="faq-section container section"><div><Eyebrow>A LITTLE MORE CLARITY</Eyebrow><h2>Your questions.<br/>A helpful place to start.</h2><p>Taking the next step should feel a little easier.</p><Button href="/contact">Talk to Our Team</Button></div><Accordion.Root type="single" collapsible className="faq-list">{questions.map(([question,answer],i)=><Accordion.Item className="faq-item" value={`faq-${i}`} key={question}><Accordion.Header><Accordion.Trigger className="faq-trigger"><span>{question}</span><Plus size={19} aria-hidden="true"/></Accordion.Trigger></Accordion.Header><Accordion.Content className="faq-content"><p>{answer}</p></Accordion.Content></Accordion.Item>)}</Accordion.Root></section>}
