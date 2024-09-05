'use client';
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative w-full h-[600px]">
      <Image
        src="/images/sharee_panjabi.png"
        alt="Sharee Panjabi"
        className="opacity-50 filter blur-sm"
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
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
            <Image
              className="rounded-md m-48"
              src="/images/sharee_1.jpg"
              width={300}
              height={400}
              alt="Panjabi"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute bottom-20 right-10 z-40"
          >
            <Image
              className="rounded-md"
              src="/images/panjabi_1.jpg"
              width={250}
              height={350}
              alt="Sharee"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute bottom-20 left-10 z-10"
          >
            <Image
              className="rounded-md"
              src="/images/threepcs_1.jpg"
              width={200}
              height={300}
              alt="Threepcs"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
