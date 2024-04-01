import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function EditCenter() {

    

    const navigate=useNavigate()

    const location=useLocation()
    const [name, setName] = useState(location.state.name)
    const [address, setAddress] = useState(location.state.address)
    const [state, setState] = useState(location.state.state)
    const [status, setStatus] = useState(location.state.status)
    const [country, setCountry] = useState(location.state.country)
    const [error, setError] = useState(null)
    const [emptyField, setEmptyField] = useState([])



    const hadlesubmit = async (e) => {
        e.preventDefault()

        const Center  = { name, address, state, country,status }

        const response = await fetch('api/center/'+location.state._id, {
            method: 'PATCH',
            body: JSON.stringify(Center),
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
            setAddress('')
            setState('')
            setStatus('')
            setCountry('')
            setEmptyField([])
            navigate('/centers')


        }
    }
  return (
    <div>
      <div class="p-4 sm:ml-64 ">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 ">
          <i>
            <Link to="/centers">
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
                Edit Center
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
                  className={emptyField.includes('name') ? 'error appearance-none block w-full outline outline-1 outline-red-500 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' : 'appearance-none block w-full  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'}
                    
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
                    Branch
                  </label>
                  <input
                    className={emptyField.includes('address') ? 'error appearance-none block w-full outline outline-1 outline-red-500 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' : 'appearance-none block w-full  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'}
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    State
                  </label>
                  <input
                    className={emptyField.includes('state') ? 'error appearance-none block w-full outline outline-1 outline-red-500 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' : 'appearance-none block w-full  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'}
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                  />
                  {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Status
                  </label>
                  <div class="relative">
                    <select
                      className={emptyField.includes('status') ? 'error appearance-none block w-full outline outline-1 outline-red-500 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' : 'appearance-none block w-full  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'}
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                    >
                      <option></option>
                      <option className="font-semibold">Open</option>
                      <option className="font-semibold">Maintainance</option>
                      <option className="font-semibold">Closed</option>
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
                    Country
                  </label>
                  <input
                   className={emptyField.includes('country') ? 'error appearance-none block w-full outline outline-1 outline-red-500 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' : 'appearance-none block w-full  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'}
                    type="text"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  />
                </div>
                <div class="w-full md:w-1/2 px-3 mt-6">
                  <button className="appearance-none block w-full border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none bg-orange-500 text-white font-bold">
                    Submit
                  </button>
                  {error && <div className="error  text-center text-red-500 mt-4">{error}</div>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCenter
