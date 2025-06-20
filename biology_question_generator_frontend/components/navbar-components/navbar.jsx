"use client"

import Link from "next/link"

export default function Navbar() {

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="navbar flex justify-between bg-customMediumGreen w-full shadow-md">
                    
                    <div className="lg:block hidden">
                        <Link className="text-xl mx-3 hover:opacity-70" href="/">Home</Link>
                    </div>

                    <div className="dropdown dropdown-end dropdown-hover lg:block hidden">
                        <label tabIndex={0} className="btn btn-square btn-ghost bg-customMediumGreen shadow-none border-0">
                            <img src="https://openmoji.org/data/color/svg/E250.svg" alt="menu icon"></img>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu text-right bg-customMediumGreen">
                            <Link className="text-xl my-1 hover:opacity-70" href="/login">Login</Link>
                            <Link className="text-xl my-1 hover:opacity-70" href="/generate">Generate</Link>
                            <Link className="text-xl my-1 hover:opacity-70" href="/about">About</Link>
                        </ul>
                    </div>

                    <label htmlFor="my-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost bg-customMediumGreen shadow-none border-0 lg:hidden block">
                        <img src="https://openmoji.org/data/color/svg/E250.svg" alt="menu icon"></img>
                    </label>

                </div>
            </div>

        <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="flex-col bg-customMediumGreen min-h-full w-60 p-4">
                <ul className="text-left">
                    <li><Link className="text-xl my-1 hover:opacity-70" href="/">Home</Link></li>
                    <li><Link className="text-xl my-1 hover:opacity-70" href="/login">Login</Link></li>
                    <li><Link className="text-xl my-1 hover:opacity-70" href="/generate">Generate</Link></li>
                    <li><Link className="text-xl my-1 hover:opacity-70" href="/about">About</Link></li>
                </ul>

            </div>
        </div>
        </div>
    )
}
