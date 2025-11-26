import React from 'react'

const Testimonials = () => {
  return (
   <>
   
    <div className="min-w-screen min-h-screen bg-base-100 flex items-center justify-center py-5">
    <div className="w-full bg-base-100 border-t border-b border-primary px-5 py-16 md:py-24 text-gray-800">
        <div className="w-full max-w-6xl mx-auto">
            <div className="text-center max-w-xl mx-auto">
                <h1 className="text-6xl md:text-7xl font-bold mb-5 text-primary">What people <br/>are saying.</h1>
                <div className="text-center mb-10">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary ml-1"></span>
                    <span className="inline-block w-3 h-1 rounded-full bg-primary ml-1"></span>
                    <span className="inline-block w-40 h-1 rounded-full bg-primary"></span>
                    <span className="inline-block w-3 h-1 rounded-full bg-primary ml-1"></span>
                    <span className="inline-block w-1 h-1 rounded-full bg-primary ml-1"></span>
                </div>
            </div>
            <div className="-mx-3 md:flex items-start">
                <div className="px-3 md:w-1/3">
                    <div className="w-full mx-auto rounded-lg bg-primary border border-gray-200 p-5 text-gray-800 font-light mb-6">
                        <div className="w-full flex mb-4 items-center">
                            <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                                <img src="https://i.pravatar.cc/100?img=1" alt=""/>
                            </div>
                            <div className="flex-grow pl-3">
                                <h6 className="font-bold text-sm uppercase text-gray-600">Kenzie Edgar.</h6>
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>The TechConf platform is a masterclass in clean UI design. Navigating between the schedule and my personal dashboard is seamless. It's rare to see an event site this responsive on mobile.<span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                        </div>
                    </div>
                    <div className="w-full mx-auto rounded-lg bg-primary border border-gray-200 p-5 text-gray-800 font-light mb-6">
                        <div className="w-full flex mb-4 items-center">
                            <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                                <img src="https://i.pravatar.cc/100?img=2" alt=""/>
                            </div>
                            <div className="flex-grow pl-3">
                                <h6 className="font-bold text-sm uppercase text-gray-600">Stevie Tifft.</h6>
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>Finally, a conference website that doesn't feel like it was built in 2010. The 'Add Event' flow for organizers is intuitive, and the dashboard gives me exactly the data I need without the clutter.<span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                        </div>
                    </div>
                </div>
                <div className="px-3 md:w-1/3">
                    <div className="w-full mx-auto rounded-lg bg-primary border border-gray-200 p-5 text-gray-800 font-light mb-6">
                        <div className="w-full flex mb-4 items-center">
                            <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                                <img src="https://i.pravatar.cc/100?img=3" alt=""/>
                            </div>
                            <div className="flex-grow pl-3">
                                <h6 className="font-bold text-sm uppercase text-gray-600">Tommie Ewart.</h6>
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>I appreciate the attention to accessibility and layout consistency. Booking tickets was instantaneous, and having my tickets sync automatically to my profile made check-in a breeze.<span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                        </div>
                    </div>
                    <div className="w-full mx-auto rounded-lg bg-primary border border-gray-200 p-5 text-gray-800 font-light mb-6">
                        <div className="w-full flex mb-4 items-center">
                            <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                                <img src="https://i.pravatar.cc/100?img=4" alt=""/>
                            </div>
                            <div className="flex-grow pl-3">
                                <h6 className="font-bold text-sm uppercase text-gray-600">Charlie Howse.</h6>
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>The speed of this platform is incredible. Search filters are instant, and I never had to wait for a page to load, even during peak ticket sales. Solid engineering work.<span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                        </div>
                    </div>
                </div>
                <div className="px-3 md:w-1/3">
                    <div className="w-full mx-auto rounded-lg bg-primary border border-gray-200 p-5 text-gray-800 font-light mb-6">
                        <div className="w-full flex mb-4 items-center">
                            <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                                <img src="https://i.pravatar.cc/100?img=5" alt=""/>
                            </div>
                            <div className="flex-grow pl-3">
                                <h6 className="font-bold text-sm uppercase text-gray-600">Nevada Herbertson.</h6>
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>As an admin, the 'Manage Products' tool saved me hours. Being able to edit event details and see updates go live instantly gave us total control over our schedule changes.<span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                        </div>
                    </div>
                    <div className="w-full mx-auto rounded-lg bg-primary border border-gray-200 p-5 text-gray-800 font-light mb-6 ">
                        <div className="w-full flex mb-4 items-center">
                            <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200 ">
                                <img className='' src="https://i.pravatar.cc/100?img=6" alt=""/>
                            </div>
                            <div className="flex-grow pl-3">
                                <h6 className="font-bold text-sm uppercase text-gray-600">Kris Stanton.</h6>
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>The dark mode implementation and card layouts are stunning. It's clear the developers focused heavily on a polished user experience. This sets a new standard for event platforms.<span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    
   </>
  )
}

export default Testimonials
