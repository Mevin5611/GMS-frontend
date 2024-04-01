
import {useState} from 'react'
import {useWorkoutContext} from '../hooks/useWOrkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'
const WorkoutForm = () => {
    const {dispatch} = useWorkoutContext()
    const {user}=useAuthContext()

    const[title,setTitle] = useState('')
    const[reps,setReps] = useState('')
    const[load,setLoad] = useState('')
    const[error,setError] = useState(null)
    const[emptyField,setEmptyField] = useState([])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!user){
            setError('You must be logged in')
            return 
        }

        const Workout={title,reps,load}

        const response = await fetch('api/workouts/',{
            method : 'POST',
            body : JSON.stringify(Workout),
            headers :{
                'Content-Type' : 'application/json',
                'Authorization':`Bearer ${user.token}`
            }

        })
        const json= await response.json()
        
        if(!response.ok){
            setError(json.error)
            setEmptyField(json.emptyField)

        }
        if(response.ok){
            setError(null)
            setTitle('')
            setReps('')
            setLoad('')
            setEmptyField([])
            dispatch({type:'CREATE_WORKOUT',payload: json})

        }

        

    }
  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add New Workout</h3>

        <label htmlFor="">Exercise :</label>
        <input 
            type="text" 
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            className={emptyField.includes('title') ? 'error' : ''}
        />
        <label htmlFor="">Reps :</label>
        <input 
            type="number" 
            onChange={(e)=>setReps(e.target.value)}
            value={reps}
            className={emptyField.includes('reps') ? 'error' : ''}
        />
        <label htmlFor="">Load (in kg):</label>
        <input 
            type="number" 
            onChange={(e)=>setLoad(e.target.value)}
            value={load}
            className={emptyField.includes('load') ? 'error' : ''}
        />
        { error && <div className='error'>{error}</div> }

        <button>Add Workout</button>
    </form>
  )
}

export default WorkoutForm