const getData = async () => {
  if (process.env.NODE_ENV === "development") {
    // Return sample data in development
    return {
      data: [
        { timestamp: "2024-09-29T08:40:15.012Z", "date-data": "2025-07-10" },
        { timestamp: "2024-09-30T13:55:27.345Z", "date-data": "2025-08-05" },
        { timestamp: "2024-10-01T19:10:38.678Z", "date-data": "2025-09-12" },
        { timestamp: "2024-10-02T10:25:50.901Z", "date-data": "2025-10-20" },
        { timestamp: "2024-10-03T15:40:03.234Z", "date-data": "2025-11-28" },
        { timestamp: "2024-10-04T21:55:15.567Z", "date-data": "2025-12-15" },
        { timestamp: "2024-10-05T12:10:27.890Z", "date-data": "2026-01-23" },
        { timestamp: "2024-10-06T18:25:40.123Z", "date-data": "2026-02-10" },
      ],
    };
  } else {
    // Make API call to our own backend route in production
    try {
      const response = await fetch("/api/retool", { method: "POST" });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
};

export default getData;
