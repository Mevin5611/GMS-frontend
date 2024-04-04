import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";

const size = {
  width: 350,
  height: 200,
};

export default function PieArcLabel() {
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
    <PieChart
    
      series={[
        {
          
          data : [
            { value: centers, label: "center",color: "#09375f"},
            { value: membercount, label: "Member", color : "#0d518b" },
            { value: trainercount, label: "Trainer", color : "#126dba" },
            { value: transactioncount, label: "Transaction", color : "#1688e8" },
            { value: expiredMembersCount, label: "Expired", color : "#a2cff6" },
          ],
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 180,
          
          
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontWeight: "bold",
        },
      }}
      {...size}
    />
  );
}
