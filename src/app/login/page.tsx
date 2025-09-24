"use client";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Login(){
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const router = useRouter();

      function submit(e: React.FormEvent) {
        e.preventDefault();
        if(!username || !password)
        {
          alert("enter details")
        }
        else{
          
          if(username=="adity0_1" && password=="ad123m9")
              {
                router.push("/dashboard")
              }
          else{
            alert("wrong details")
            setUsername("");
            setPassword("");
          }
        }
            
          }
      

  return (
    


    <div className="bg-gradient-to-r from-white to-red-700 min-h-screen items-center justify-center flex overflow-hidden">
        <div className="h-94 p-8 shadow-2xl border w-full max-w-md rounded-2xl">
            
                <span className="text-2xl font-serif">Username :</span>
                <input type="text" className="bg-white p-1 my-2 rounded-sm w-full focus:outline-none mb-4" placeholder=" username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <span className="text-2xl font-serif">Password :</span>
                <input type="password" className="bg-white p-1 my-2 rounded-sm h- w-full focus:outline-none" placeholder=" password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                
                
                <button className="bg-red-700 text-white w-full rounded-xl p-1 mt-6 mb-4 hover:bg-red-800 cursor-pointer" onClick={submit}>Login</button>
                <span className="cursor-pointer text-blue-900 focus:outline-none focus:border-white mr-52 hover:underline">sign up</span>
                <span className="text-blue-900 hover:underline cursor-pointer" >forget password</span>
        
        </div>
    </div>
  )
}