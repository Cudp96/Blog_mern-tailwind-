import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
    return (
        <section className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center' >
            <div className='flex-1 justify-center flex flex-col'>
                <h2 className='text-2xl '>
                    Want to learn more about JavaScript?
                </h2>
                <p className='text-gray-500 my-2'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Adipisci tempora minus quia doloribus quos mollitia corrupti
                    necessitatibus, laudantium sequi illum reprehenderit 
                </p>
                <Button gradientDuoTone='purpleToPink'>
                    <a href="https://sudeep96.netlify.app/" target='_blank' rel='noopener noreferrer' className='rounded-tl-xl rounded-bl-none'>Learn More</a>
                </Button>
            </div>
            <div className='p-7 flex-1 '>
                <img src="https://lh3.googleusercontent.com/proxy/5hdxS_rrAyr73bvvAhX9tlL_hM1cvc0mfFwyO3IHoLpEqyBKZZstrMq4CuoTEdI2MnoCBaUpS7_IMBXFjbXzfc1gph3DEEOMYcHHvdzqaytt-BC6xd3WIYOd9wwOMLTk_Cp99mP2aAMsk-D7eLZvLEuaph8BVgcmDYqgf1WenzLtU_wgIYZ5IdlT-l-dRN11qKc5v9sQOQ" alt="" />
            </div>
        </section>
    )
}

export default CallToAction