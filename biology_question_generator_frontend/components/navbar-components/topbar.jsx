import { hamburgerURL } from "./contents";
import Link from "next/link";

export default function Topbar({loginStatus}) {
    return (
        <div className="drawer-content flex flex-col">
            <div className="navbar flex justify-between bg-customMediumGreen w-full shadow-md">
                
                <div className="lg:block hidden">
                    <Link className="text-xl mx-3 hover:opacity-70" href="/">Home</Link>
                </div>

                <div className="dropdown dropdown-end dropdown-hover lg:block hidden">
                    <label tabIndex={0} className="btn btn-square btn-ghost bg-customMediumGreen shadow-none border-0">
                        <img src={hamburgerURL} alt="menu icon"></img>
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu text-right bg-customMediumGreen">
                        {
                            loginStatus ?
                            <Link className="text-xl my-1 hover:opacity-70" href="/logout">Logout</Link> :
                            <Link className="text-xl my-1 hover:opacity-70" href="/login">Login</Link>
                        }
                        <Link className="text-xl my-1 hover:opacity-70" href="/generate">Generate</Link>
                        <Link className="text-xl my-1 hover:opacity-70" href="/about">About</Link>
                    </ul>
                </div>

                <label htmlFor="my-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost bg-customMediumGreen shadow-none border-0 lg:hidden block">
                    <img src={hamburgerURL} alt="menu icon"></img>
                </label>

            </div>
        </div>
    )
}