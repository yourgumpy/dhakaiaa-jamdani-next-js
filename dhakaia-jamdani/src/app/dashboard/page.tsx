import React from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/supabaseServer'
import LogOutBtn from '../components/logOutBtn';

export default async function Dashboard() {
    const supabase = await createClient();

    const { data, error} = await supabase.auth.getUser();
    // console.log(data, error);
    if(error || !data?.user){
        redirect("/login");
    }
    const userData = data.user.user_metadata;
    return (
        <div className="card mt-20 h-[500px] flex justify-center items-center">
            <h1>Dashboard</h1>
            <p>Welcome {data.user.email}</p>
            <p>{userData.firstname}</p>
            <p>{userData.lastname}</p>
            <LogOutBtn />
        </div>
    )
}
