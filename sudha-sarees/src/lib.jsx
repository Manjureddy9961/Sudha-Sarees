import {createClient} from '@supabase/supabase-js';import {createContext,useContext,useEffect,useRef,useState} from 'react';import {motion} from 'framer-motion';
export const sb=createClient(import.meta.env.VITE_SUPABASE_URL||'http://x',import.meta.env.VITE_SUPABASE_ANON_KEY||'x');
export const PHONE=import.meta.env.VITE_SHOP_PHONE||'919999999999';
export const ADDRESS='Sudha Sarees, Opposite New Police Station, Kadiri Road, Rayachoty, Annamayya District, Andhra Pradesh';
export const inr=n=>'₹'+Number(n||0).toLocaleString('en-IN');
export const device=()=>{let d=localStorage.getItem('sd');if(!d){d=crypto.randomUUID();localStorage.setItem('sd',d)}return d};
export const upload=async(bucket,file)=>{const p=crypto.randomUUID()+'-'+file.name.replace(/\s/g,'_');const{error}=await sb.storage.from(bucket).upload(p,file);if(error)throw error;return sb.storage.from(bucket).getPublicUrl(p).data.publicUrl};
export function useData(fn,deps=[]){const[d,setD]=useState(null);const load=()=>fn().then(r=>setD(r.data||[]));useEffect(()=>{load()},deps);return[d,load]}
export const WishCtx=createContext();export const useWish=()=>useContext(WishCtx);
export function useLongPress(cb,ms=2000){const t=useRef();const stop=()=>clearTimeout(t.current);return{onPointerDown:()=>{t.current=setTimeout(cb,ms)},onPointerUp:stop,onPointerLeave:stop,onPointerCancel:stop,onContextMenu:e=>e.preventDefault()}}
export const Reveal=({children,d=0,className=''})=><motion.div className={className} initial={{opacity:0,y:36}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.7,delay:d}}>{children}</motion.div>;
export const Logo=({size=48,draw})=><svg width={size} height={size} viewBox="0 0 100 100" aria-label="Sudha Sarees logo"><circle cx="50" cy="50" r="47" fill="#7B1E3A" stroke="#C9A24B" strokeWidth="3"/>
<motion.path d="M66 30C58 20 38 22 36 35c-2 14 26 12 26 28 0 14-22 17-30 5" fill="none" stroke="#C9A24B" strokeWidth="6" strokeLinecap="round" initial={draw?{pathLength:0}:false} animate={{pathLength:1}} transition={{duration:2,ease:'easeInOut'}}/>
<motion.path d="M28 82C46 70 62 86 78 72" fill="none" stroke="#F7E1E7" strokeWidth="2.5" strokeLinecap="round" initial={draw?{pathLength:0}:false} animate={{pathLength:1}} transition={{duration:1.5,delay:1.2}}/>
{[[50,12],[40,16],[60,16]].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="3" ry="5" fill="#F7E1E7" transform={`rotate(${(i-1)*30} ${x} ${y})`}/>)}</svg>;
