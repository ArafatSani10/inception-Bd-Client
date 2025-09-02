import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const PartnershipLogo = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/v1/brands");
      if (res.data.success) {
        setBrands(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to fetch brands");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching brands");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-700 dark:text-gray-300">
        Loading logos...
      </div>
    );
  }

  if (!brands.length) {
    return (
      <div className="py-20 text-center text-gray-700 dark:text-gray-300">
        No brands found.
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden py-10 dark:bg-[#00091a] bg-gray-50">
      <h2 className="text-center mb-10 md:mb-20 text-2xl md:text-5xl font-bold text-[#00baff]">
        🚩 Our students are placed at
      </h2>

      <div className="relative overflow-hidden">
        <div className="flex animate-scroll gap-10 w-max">
          {[...brands, ...brands].map((brand, i) => (
            <a
              key={i}
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group transform transition duration-300 hover:scale-110"
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-20 max-sm:h-14 w-auto object-contain rounded-lg shadow-md bg-white p-2 transition duration-300 group-hover:shadow-xl"
                />
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-200 font-medium text-center opacity-0 group-hover:opacity-100 transition duration-300">
                  {brand.name}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Animation CSS */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 9s linear infinite;
        }

        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll 10s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default PartnershipLogo;
