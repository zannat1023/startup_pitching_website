import Link from 'next/link'
import {auth, signOut, signIn} from "@/auth"
import { redirect } from 'next/dist/server/api-utils';
//import { signOut } from 'next-auth/react'

const Navbar = async () => {
    const session = await auth();
    return(
        <header className="px-5 p-3 bg-white shadow-sm dont-work-sans">
            <nav className= "flex justify-between item-center">
                <Link href="/">
                    <img src="/logo.png" alt="logo" width= {144} height ={30} />
                </Link>

                <div className='flex items-center gap-5 text-black'>
                    {session && session?.user ? (
                      <>
                        <Link href="/startup/create">
                            <span>Create</span>
                        </Link>
                        <form action ={async () => {
                            "use server"
                            await signOut ({ redirectTo: "/" });
                        }}>
                            <button type = "submit">
                                Logout
                                </button>
                        </form>

                        <Link href = {'/user/${session?.id}'}>
                        <span>{session?.user?.name}</span>
                        </Link>
                      </>  
                    ):
                    (
                        <form action ={async () => {
                            "use server";

                            await signIn('github');
                        }}>
                            <button type="submit">
                                Login
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header> 
    )
}

export default Navbar