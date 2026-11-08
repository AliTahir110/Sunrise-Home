import {site} from '@/data/site';

export const runtime='nodejs';
const MAX_FILE_SIZE=5*1024*1024;
const allowedTypes=new Set(['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
const allowedExtensions=new Set(['pdf','doc','docx']);
const attempts=new Map<string,{count:number;reset:number}>();

function value(form:FormData,key:string,max:number){const item=form.get(key);return typeof item==='string'?item.trim().slice(0,max):''}
function escapeHtml(input:string){return input.replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]||char))}
function limited(request:Request){const ip=(request.headers.get('x-forwarded-for')||'unknown').split(',')[0].trim();const now=Date.now();const current=attempts.get(ip);if(!current||current.reset<now){attempts.set(ip,{count:1,reset:now+10*60_000});return false}current.count+=1;return current.count>5}

export async function POST(request:Request){
 if(limited(request))return Response.json({message:'Too many application attempts. Please wait and try again.'},{status:429});
 const contentLength=Number(request.headers.get('content-length')||0);if(contentLength>7*1024*1024)return Response.json({message:'The application is too large.'},{status:413});
 let form:FormData;try{form=await request.formData()}catch{return Response.json({message:'We could not read this application.'},{status:400})}
 if(value(form,'website',200))return Response.json({message:'Application received.'});
 const name=value(form,'name',100),email=value(form,'email',150),phone=value(form,'phone',40),role=value(form,'role',120),message=value(form,'message',2500);const consent=form.get('consent');const resume=form.get('resume');
 if(!name||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!phone||message.length<30||!consent)return Response.json({message:'Please complete all required fields.'},{status:400});
 if(!(resume instanceof File)||!resume.name)return Response.json({message:'Please attach your résumé.'},{status:400});
 const extension=resume.name.split('.').pop()?.toLowerCase()||'';if(resume.size>MAX_FILE_SIZE)return Response.json({message:'Your résumé must be 5 MB or smaller.'},{status:400});if(!allowedTypes.has(resume.type)||!allowedExtensions.has(extension))return Response.json({message:'Attach a PDF, DOC or DOCX résumé.'},{status:400});
 const apiKey=process.env.RESEND_API_KEY,from=process.env.CAREERS_FROM_EMAIL,to=process.env.CAREERS_TO_EMAIL||site.jobs;if(!apiKey||!from)return Response.json({message:'Online applications are not configured yet.'},{status:503});
 const content=Buffer.from(await resume.arrayBuffer()).toString('base64');const safeName=resume.name.replace(/[^a-zA-Z0-9._-]/g,'_');
 const delivery=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[to],reply_to:email,subject:`Career application: ${name} — ${role||'General application'}`,html:`<h2>Career application</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Telephone:</strong> ${escapeHtml(phone)}</p><p><strong>Role:</strong> ${escapeHtml(role||'General application')}</p><h3>Supporting statement</h3><p>${escapeHtml(message).replace(/\n/g,'<br>')}</p>`,attachments:[{filename:safeName,content}]})});
 if(!delivery.ok){console.error('Career application delivery failed',delivery.status);return Response.json({message:'We could not deliver your application right now.'},{status:502})}
 return Response.json({message:'Thank you. Your application and résumé have been sent to the Sunrise recruitment team.'});
}
