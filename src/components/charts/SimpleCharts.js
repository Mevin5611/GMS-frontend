import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function SimpleCharts() {
  const [members, setMembers] = useState("");
  const [centers, setCenters] = useState("");
  const [membercount, setMembercount] = useState("");
  const [trainercount, setTrainercount] = useState("");
  const [transactioncount, setTransactioncount] = useState("");
  const [expiredMembersCount, setExpiredMembersCount] = useState(0);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch("https://gms-backend-cj6n.onrender.com/api/member/");
      const json = await response.json();

      if (response.ok) {
        setMembers(json);
        setMembercount(json.length);
        setTransactioncount(json.length);
      }
      const currentDate = new Date();

      // Filter members with expiredate > today's date
      const filteredMembers = json
        ? json.filter((Member) => currentDate > new Date(Member.expiredate))
        : [];
      setExpiredMembersCount(filteredMembers.length);
    };
    const fetchTrainers = async () => {
      const response = await fetch("https://gms-backend-cj6n.onrender.com/api/trainer/");
      const json = await response.json();

      if (response.ok) {
        setTrainercount(json.length);
      }
    };
    const fetchCenters = async () => {
      const response = await fetch("https://gms-backend-cj6n.onrender.com/api/center/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setCenters(json.length);
      }
    };

    if (user) {
      fetchMembers();
      fetchTrainers();
      fetchCenters();
    }
  }, []);
  return (
    <div className="md:text-base text-sm">
      <BarChart
      series={[
        { data: [centers], stack: "A", label: "Center",color: "#09375f"},
        { data: [membercount], stack: "B", label: "Member" ,color:"#0d518b"},
        { data: [trainercount], stack: "C", label: "Trainer", color: "#126dba" },
        { data: [transactioncount], stack: "D", label: "Transcations", color: "#1688e8" },
        { data: [expiredMembersCount], stack: "E", label: "Expired",color: "#a2cff6" },
      ]}
      height={400}
      
      
     
    />
    </div>
  );
}
