// src/hooks/useCourses.js
import { useEffect, useState } from "react";
import axios from "axios";

const useCourses = (onlyApproved = false) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);


        const data = response.data.data || [];

        // approved filter যদি true হয়
        const finalCourses = onlyApproved
          ? data.filter((course) => course.approval === "Approved")
          : data;

        const coursesWithDefaults = finalCourses.map((course) => ({
          ...course,
          instructor: course.instructor || { name: "Unknown" },
          category: course.category || { name: "Unknown" },
        }));

        setCourses(coursesWithDefaults);
      } catch (err) {
        setError("Failed to fetch courses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [onlyApproved]);

  return { courses, loading, error };
};

export default useCourses;
