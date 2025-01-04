'use client';
import React, { useEffect, useState } from 'react'
import LogOutBtn from '../components/logOutBtn';
import { getUserData, userProfile } from '../auth/getUser';
import { User } from '@supabase/supabase-js';
import { UserProfile } from '../auth/getUser';
import { redirect } from 'next/navigation';


export default function Dashboard() {
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [data, setData] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserData();

            setData(user);
        };
        // console.log(user);
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await userProfile();
            setUserData(data);
        };
        fetchUserData();
    }, []);
    // console.log("UserData", userData);

    if (userData?.role === 'admin') {
        redirect('/Admin/AllProducts');
    }
    else if(!data){
        // redirect('/login');
    }

    return (
        <div className="card mt-20 h-[500px] flex justify-center items-center">
            <h1>Dashboard</h1>
            <p>Welcome {data?.email}</p>
            <p>{userData?.firstname}</p>
            <p>{userData?.lastname}</p>
            <p>{userData?.role}</p>
            <LogOutBtn />
        </div>
    )
}
