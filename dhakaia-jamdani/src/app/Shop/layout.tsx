import LeftBar from '../components/ShopPage/LeftBar'
import Image from 'next/image'
import TopBar from '../components/ShopPage/TopBar'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className="relative w-full h-64">
                <Image
                    src="/images/Do-Shopping.png"
                    alt="Do Shopping"
                    width={1920}
                    height={1080}
                    objectFit="cover"
                    className="w-full h-full blur-sm"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                    <h1 className="text-4xl font-sans font-bold">Do Your Shopping</h1>
                </div>
            </div>
            <div className="min-h-[300px] flex justify-center p-5 pt-10">
                <div className='lg:block hidden'>
                    <LeftBar />
                </div>
                <div className='grid lg:pl-10'>
                    <TopBar />
                    {children}
                </div>
            </div>
        </div>
    )
}

export default layout
