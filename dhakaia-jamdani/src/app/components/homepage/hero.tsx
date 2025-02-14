'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative w-full h-[600px]">
      <Image
        src="/images/sharee_panjabi.png"
        alt="Sharee Panjabi"
        className="opacity-50 filter blur-sm"
        style={{ objectFit: 'cover' }}
        quality={100}
        fill={true}
      />

      <div className="absolute inset-0 flex items-center justify-between container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-white"
        >
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0 }}
            className="text-2xl md:text-3xl font-bold text-black"
          >
            Welcome to
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-red-600"
          >
            Dhakaiaa Jamdani
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xl md:text-2xl mt-4 text-gray-600"
          >
            The best place to find your favorite Sharee Panjabi
          </motion.p>
        </motion.div>

        <div className="relative hidden md:block">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative z-30"
          >
            <div className="relative">
              <Image
                className="rounded-md m-48"
                src="/images/sharee_1.jpg"
                width={300}
                height={400}
                alt="Sharee"
              />
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute top-10 right-1/4 transform -translate-x-1/2 bg-[#203147] text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-yellow-200 transition-all duration-300"
              >
                <Link href="http://localhost:3000/Shop?category=Sharee">Sharee</Link>
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute bottom-20 right-10 z-40"
          >
            <div className="relative">
              <Image
                className="rounded-md"
                src="/images/panjabi_1.jpg"
                width={250}
                height={350}
                alt="Panjabi"
              />
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="absolute bottom-4 -right-10 transform -translate-x-1/2 bg-[#6d3737] text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-yellow-200 transition-all duration-300"
              >
                <Link href="http://localhost:3000/Shop?category=Panjabi">Panjabi</Link>
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute bottom-20 left-10 z-10"
          >
            <div className="relative">
              <Image
                className="rounded-md"
                src="/images/threepcs_1.jpg"
                width={200}
                height={300}
                alt="Three Piece"
              />
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                className="absolute bottom-4 -left-10 transform -translate-x-1/2 bg-yellow-300 text-red-600 px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-yellow-200 transition-all duration-300"
              >
                <Link href="http://localhost:3000/Shop?category=Threepcs">Three Piece</Link>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;