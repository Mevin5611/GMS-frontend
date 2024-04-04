import React, { useState , useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


function EditPackage() {
    const location=useLocation()
    
    const [centers, setCenters] = useState(null)
    

  useEffect(() => {
    const fetchCenters = async () => {
      const response = await fetch('https://gms-backend-cj6n.onrender.com/api/center/')
      const json = await response.json()

      if (response.ok) {
        setCenters(json)

      }
    }
    
    fetchCenters()
  },[])

    const navigate=useNavigate()

    const [name, setName] = useState(location.state.name)
    const [price, setPrice] = useState(location.state.price)
    const [center, setCenter] = useState(location.state.center)
    const [days, setDays] = useState(location.state.days)
    const [trainingtype, setTrainingtype] = useState(location.state.trainingtype)
    const [error, setError] = useState(null)
    const [emptyField, setEmptyField] = useState([])

    const hadlesubmit = async (e) => {
        e.preventDefault()

        const Package = { name, price, center, days, trainingtype }

        const response = await fetch('https://gms-backend-cj6n.onrender.com/api/package/'+location.state._id, {
            method: 'PATCH',
            body: JSON.stringify(Package),
            headers: {
                'Content-Type': 'application/json'

            }

        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyField(json.emptyField)

        }
        if (response.ok) {
            setError(null)
            setName('')
            setPrice('')
            setCenter('')
            setDays('')
            setTrainingtype('')
            setEmptyField([])
            navigate('/packages')


        }
    }
  return (
    <div>
      <div class="p-4 sm:ml-64 ">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 ">
          <i>
            <Link to="/packages">
              <img
                className="w-7 h-7 "
                src="https://cdn-icons-png.flaticon.com/512/786/786197.png"
                alt="back"
              />
            </Link>
          </i>
          <div className="w-full flex justify-center">
            <form onSubmit={hadlesubmit} class="w-full max-w-lg">
              <h3 className="text-center mt-4 font-bold text-2xl mb-10">
                Edit Package
              </h3>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Name
                  </label>
                  <input
                    class="appearance-none block w-full  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Price
                  </label>
                  <input
                    class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Center
                  </label>
                  <div class="relative">
                    <select
                      class="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={(e) => setCenter(e.target.value)}
                      value={center}
                    >
                      <option></option>
                      {centers &&
                        centers.map((center) => (
                          <option className="font-semibold">
                            {center.address}
                          </option>
                        ))}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Days
                  </label>
                  <input
                    class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    onChange={(e) => setDays(e.target.value)}
                    value={days}
                  />
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Trainging Type
                  </label>
                  <input
                    class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    onChange={(e) => setTrainingtype(e.target.value)}
                    value={trainingtype}
                  />
                </div>
                <div class="w-full md:w-1/2 px-3 mt-6">
                  <button className="appearance-none block w-full border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-orange-500 text-white font-bold">
                    Submit
                  </button>
                  {error && <div className="error">{error}</div>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPackage
