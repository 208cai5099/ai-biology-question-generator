"use client"

import HomeRouteButton from "./home-route-button"
import LoginRouteButton from "./login-route-button"
import GenerateRouteButton from "./generate-route-button"
import AboutRouteButton from "./about-route-button"

export default function Navbar() {

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="navbar flex justify-between bg-customMediumGreen w-full shadow-md">
                    
                    <div className="lg:block hidden">
                        <HomeRouteButton />
                    </div>

                    <div className="dropdown dropdown-end dropdown-hover lg:block hidden">
                        <label tabIndex={0} className="btn btn-square btn-ghost bg-customMediumGreen shadow-none border-0">
                            <img src="https://openmoji.org/data/color/svg/E250.svg" alt="menu icon"></img>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu bg-customMediumGreen">
                            <li><LoginRouteButton /></li>
                            <li><GenerateRouteButton /></li>
                            <li><AboutRouteButton /></li>
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
                <HomeRouteButton />
                <LoginRouteButton />
                <GenerateRouteButton />
                <AboutRouteButton />
            </div>
        </div>
        </div>
    )
}
