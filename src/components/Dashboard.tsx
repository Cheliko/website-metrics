import React, { useEffect, useState } from "react";
import DataChart from "./DataChart";
import DataTable from "./DataTable";

interface MetricData {
  timestamp: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
}

interface DashboardData {
  title: string;
  data: MetricData[];
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData>();
  const [loading, setLoading] = useState<boolean>(true);

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/sample.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData: DashboardData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data && (
        <>
          <h1>{data.title}</h1>
          <DataTable metrics={data.data} />
          <DataChart metrics={data.data} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
