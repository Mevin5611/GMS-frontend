import React from "react";
import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWOrkoutContext";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useAuthContext } from "../hooks/useAuthContext";
const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("api/workouts/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUT", payload: json });
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, []);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((Workout) => (
            <WorkoutDetails Workout={Workout} key={Workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
