import { useState, useEffect } from "react";

const useAuthCall = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Introduce loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/auth");
        const data = await response.json();

        // Check if response is not null and not empty
        if (data && Object.keys(data).length > 0) {
          // Adjust as per your API response structure
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setUser(null);
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or error
      }
    };

    fetchData();
  }, []);

  return { user, isLoading }; // Return user and loading state
};

export default useAuthCall;
