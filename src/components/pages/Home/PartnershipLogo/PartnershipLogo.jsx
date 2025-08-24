import React from 'react';

const logos = [
    'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    'https://inceptionbd.com/store/1/Untitled%20design%20(3).png',
    'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
    'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
];

const PartnershipLogo = () => {
    return (
        <div className="relative overflow-hidden py-5  dark:bg-[#00091a]">

            <div>
                <h1 className='text-center mb-10 md:mb-20  md:text-5xl text-2xl text-[#00baff] font-semibold'>🚩Our students are placed at</h1>
            </div>
            <div className="animate-scroll flex items-center gap-16 w-max ">
                {[...logos, ...logos].map((logo, i) => (
                    <img
                        key={i}
                        src={logo}
                        alt={`Partner ${i}`}
                        className="h-12 w-auto grayscale-0 transition duration-300"
                    />
                ))}
            </div>

            {/* Animation CSS */}
            <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default PartnershipLogo;
