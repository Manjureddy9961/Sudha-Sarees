import {useEffect,useState} from 'react';import {Routes,Route,Link,NavLink,useLocation} from 'react-router-dom';import {AnimatePresence,motion} from 'framer-motion';
import {sb,device,Logo,WishCtx,useData,ADDRESS} from './lib';import {Home,Types,TypePage,Detail,Wishlist,About,Contact} from './pages';import Admin from './Admin';
function Nav(){const[s,setS]=useState(false),[open,setOpen]=useState(false),[types]=useData(()=>sb.from('types').select('*').order('name'));
useEffect(()=>{const f=()=>setS(scrollY>40);addEventListener('scroll',f);return()=>removeEventListener('scroll',f)},[]);
const L=({to,children})=><NavLink to={to} onClick={()=>setOpen(false)} className={({isActive})=>`hover:text-gold ${isActive?'text-gold':''}`}>{children}</NavLink>;
return <motion.header animate={{paddingBlock:s?6:16}} className="fixed inset-x-0 top-0 z-40 bg-maroon/95 text-ivory shadow-lg backdrop-blur">
<div className="mx-auto flex max-w-6xl items-center justify-between px-4"><Link to="/" className="flex items-center gap-2"><Logo size={s?36:46}/><span className="font-head text-2xl font-bold text-gold">Sudha Sarees</span></Link>
<button className="md:hidden text-2xl" onClick={()=>setOpen(!open)} aria-label="Menu">☰</button>
<nav className={`${open?'flex':'hidden'} absolute left-0 top-full w-full flex-col gap-4 bg-maroon p-5 md:static md:flex md:w-auto md:flex-row md:items-center md:gap-7 md:bg-transparent md:p-0`}>
<L to="/">Home</L><div className="group relative"><L to="/sarees">Sarees ▾</L>
<div className="invisible absolute left-0 top-full min-w-48 rounded-xl bg-ivory p-2 text-maroon opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 max-md:static max-md:visible max-md:opacity-100 max-md:bg-transparent max-md:text-blush">
{(types||[]).map(t=><Link key={t.id} to={`/sarees/${t.id}`} onClick={()=>setOpen(false)} className="block rounded-lg px-3 py-1.5 hover:bg-blush hover:text-maroon">{t.name}</Link>)}</div></div>
<L to="/wishlist">Wishlist ♥</L><L to="/about">About</L><L to="/contact">Contact</L></nav></div></motion.header>}
export default function App(){const loc=useLocation(),[ids,setIds]=useState([]);
useEffect(()=>{sb.from('wishlists').select('saree_id').eq('device_id',device()).then(r=>setIds((r.data||[]).map(x=>x.saree_id)))},[]);
const toggle=async id=>{const has=ids.includes(id);setIds(has?ids.filter(x=>x!==id):[...ids,id]);const q=sb.from('wishlists');has?await q.delete().match({device_id:device(),saree_id:id}):await q.insert({device_id:device(),saree_id:id})};
return <WishCtx.Provider value={{ids,toggle}}><Nav/>
<AnimatePresence mode="wait"><motion.main key={loc.pathname} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} transition={{duration:.35}} className="min-h-screen pt-20">
<Routes location={loc}><Route path="/" element={<Home/>}/><Route path="/sarees" element={<Types/>}/><Route path="/sarees/:typeId" element={<TypePage/>}/><Route path="/saree/:id" element={<Detail/>}/><Route path="/wishlist" element={<Wishlist/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="/admin" element={<Admin/>}/></Routes></motion.main></AnimatePresence>
<footer className="mt-16 bg-maroon text-blush"><div className="border-pat"/><div className="mx-auto max-w-6xl p-8 text-center"><Logo size={56}/><p className="mt-2 font-head text-2xl text-gold">Sudha Sarees</p><p className="mx-auto mt-2 max-w-md text-sm">{ADDRESS}</p><p className="mt-4 text-xs opacity-70">© {new Date().getFullYear()} Sudha Sarees</p></div></footer></WishCtx.Provider>}
