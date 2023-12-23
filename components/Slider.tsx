'use client'
const data =[
  {
    id:1,
    title:"He's nervous, but on the surface he looks calm and ready",
    image:'/smash1.jpg'
    
  },
  {
    id:2,
    title:"  You only get one shot, do not miss your chance to blow",
    image:'/smash2.jpg'
    
  },
  {
    id:2 ,
    title:"  This opportunity comes once in a lifetime, you better",
    image:'/smash3.jpg'
  },
]


import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

useEffect(()=>{
const interval = setInterval(()=>{
  setCurrentSlide((prev)=> (prev ===data.length-1 ? 0 : prev+1))
}, 4000)
return ()=> clearInterval(interval)
})

  return (
    <div className=' border  bg-fuchsia-50 dark:bg-slate-900  flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]  lg:flex-row '>
{/* text container */}
<div className='w-full h-1/2 flex-1 flex items-center justify-center flex-col gap-8 text-red-500 font-bold  lg:h-full lg:w1/'>

<h1 className='  md:p-3 text-4xl text-center uppercase p-4 md:text-6xl xl:text-7xl'>
   {data[currentSlide].title}  
</h1>
<Link className=" dark:bg-green-800 dark:hover:bg-green-900 font-bold capitalize flex cursor-pointer text-gray-300 p-4 w-fit bg-green-600 hover:bg-green-500 " href="/dashboard">
    lets dive into
    <ArrowUpRight  className="ml-2"/>
  </Link>


</div >
<div className=' flex-1 lg:h-full  w-full h-1/2 relative'>
<Image alt='IMAGE'  className='  object-cover md:object-cover' fill src={data[currentSlide].image} /> 

</div>


    </div>
  )
}

export default Slider