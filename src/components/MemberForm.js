import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMemberContext } from "../hooks/useMemberContext";
import { useAuthContext } from "../hooks/useAuthContext";
import emailjs from "emailjs-com";
import { format} from 'date-fns'



function MemberForm() {
  const { dispatch } = useMemberContext();
  const { user } = useAuthContext();

  const [centers, setCenters] = useState(null);
  const [packages, setPackages] = useState(null);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [center, setCenter] = useState("");
  const [joindate, setJoindate] = useState("");
  const [gender, setGender] = useState("");
  const [martialstatus, setMartialstatus] = useState("");
  const [pack, setPack] = useState("");
  const [startdate, setStartdate] = useState("");
  const [paidamount, setPaidamount] = useState("");
  const [paymentdate, setPaymentdate] = useState("");
  const [paymentmethod, setPaymentmethod] = useState("");

  const [status, setStatus] = useState("Unexpired");
  const [error, setError] = useState(null);
  const [emptyField, setEmptyField] = useState([]);
  const [img, setImg] = useState(null);

  useEffect(() => {
    const fetchCenters = async () => {
      const response = await fetch("/api/center/");
      const json = await response.json();

      if (response.ok) {
        setCenters(json);
      }
    };

    const fetchPackages = async () => {
      const response = await fetch("/api/package/");
      const json = await response.json();

      if (response.ok) {
        setPackages(json);
        
      }
    };
    fetchCenters();
    fetchPackages();

  }, []);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setImg(file); // Store the selected image in state
  };



  const sendEmail = async () => {
  
    const templateParams = {
      to_name: name,
      to_email: email,
      member_phone:phone,
      member_join_date:format ( new Date(joindate), 'dd-MM-yyyy'),
      gym_name:"Aesthetic Fitness",
      // Add more parameters here as needed for your email template
    };
  
    try {
      await emailjs.send(
        "service_vh9ha6q",
        "template_01pbzzn",
        templateParams,
        "ehLhj2qmOPNMsQigN"
      );
  
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Email sending failed:", error);
    }
  };

  const hadlesubmit = async (e) => {
    e.preventDefault();

    
    
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const selectedPackage = packages.find((pkg) => pkg.days === parseInt(pack));

  if (!selectedPackage) {
    setError("Invalid package selected");
    return;
  }

  // Update offerprice with the price from the selected package
  const updatedOfferPrice = selectedPackage.price;

    const dues = (updatedOfferPrice-paidamount)

    const day = parseInt(pack);

    

    const startDate = new Date(startdate);

    // Calculate the future date by adding the 'pack' number of days to the 'startdate'
    const futureDate = new Date(startDate);
    futureDate.setDate(startDate.getDate() + day);

    const formData = new FormData(); // Create a FormData object to send the image
    formData.append("img", img);
    // Append the properties
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("dob", dob);
    formData.append("center", center);
    formData.append("joindate", joindate);
    formData.append("gender", gender);
    formData.append("martialstatus", martialstatus);
    formData.append("pack", pack);
    formData.append("offerprice", updatedOfferPrice);
    formData.append("startdate", startdate);
    formData.append("paidamount", paidamount);
    formData.append("dues", dues );
    formData.append("paymentdate", paymentdate);
    formData.append("paymentmethod", paymentmethod);
    formData.append("expiredate", futureDate);
    formData.append("status", status);

    const response = await fetch("api/member/", {
      method: "POST",
      body:formData ,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      if (json.emptyField === undefined) {
        setEmptyField([]);
      } else {
        setEmptyField(json.emptyField);
      }
    }
    if (response.ok) {
      setError(null);
      setName("");
      setPhone("");
      setEmail("");
      setDob("");
      setCenter("");
      setJoindate("");
      setGender("");
      setMartialstatus("");
      setPack("");
      setStartdate("");
      setPaidamount("");
      setPaymentdate("");
      setPaymentmethod("");
      setStatus("");
      setImg(null);

      if (json.emptyField === undefined) {
        setEmptyField([]);
      } else {
        setEmptyField(json.emptyField);
      }
      dispatch({ type: "CREATE_MEMBER", payload: json });
      navigate("/members");
      sendEmail(); 
    }
    
  };



  return (
    <div>
      <div className="p-4 sm:ml-64 ">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 ">
          <i>
            <Link to="/members">
              <img
                className="w-7 h-7 "
                src="https://cdn-icons-png.flaticon.com/512/786/786197.png"
                alt="back"
              />
            </Link>
          </i>
          <div className="min-h-screen flex items-center justify-center mt-5">
            <div className="container max-w-screen-lg mx-auto">
              <div>
                <h2 className="font-bold text-2xl text-gray-600 mb-5">
                  Add Member
                </h2>

                <form onSubmit={hadlesubmit} encType="multipart/form-data">
                  <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                      <div className="text-gray-600">
                        <p className="font-medium text-lg">Personal Details</p>
                        <p>Please fill out all the fields.</p>
                      </div>

                      <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                          <div className="md:col-span-3  ">
                            <label for="full_name">photo</label>
                            <div className=" border mt-1 rounded px-4 w-full h-10 flex  items-center  bg-gray-50">
                              <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                name="photo"
                                onChange={handlePhoto}
                              />
                            </div>
                          </div>
                          <div className="md:col-span-5">
                            <label for="full_name">Full Name</label>
                            <input
                              type="text"
                              className={
                                emptyField.includes("name")
                                  ? "outline outline-1 outline-red-500 h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  : "h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              }
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                            />
                          </div>
                          <div className="md:col-span-5">
                            <label for="full_name">Phone Number</label>
                            <input
                              type="number"
                              className={
                                emptyField.includes("phone")
                                  ? "outline outline-1 outline-red-500 h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  : "h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              }
                              onChange={(e) => setPhone(e.target.value)}
                              value={phone}
                            />
                          </div>

                          <div className="md:col-span-5">
                            <label for="email">Email Address</label>
                            <input
                              type="email"
                              className={
                                emptyField.includes("email")
                                  ? "outline outline-1 outline-red-500 h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  : "h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              }
                              placeholder="email@domain.com"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                          </div>
            
                          <div className="sm:col-span-3">
                            <label for="zipcode">Gender</label>

                            <div className="flex mt-3">
                              <div className="flex items-center mr-4">
                                <input
                                  id="inline-radio"
                                  type="radio"
                                  value="male"
                                  name="inline-radio-group"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  onChange={(e) => setGender(e.target.value)}
                                />
                                <label
                                  for="inline-radio"
                                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  male
                                </label>
                              </div>
                              <div className="flex items-center mr-4">
                                <input
                                  id="inline-2-radio"
                                  type="radio"
                                  value="female"
                                  name="inline-radio-group"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  onChange={(e) => setGender(e.target.value)}
                                />
                                <label
                                  for="inline-2-radio"
                                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  female
                                </label>
                              </div>
                              <div className="flex items-center mr-4">
                                <input
                                  id="inline-2-radio"
                                  type="radio"
                                  value="i prefer not to say"
                                  name="inline-radio-group"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  onChange={(e) => setGender(e.target.value)}
                                />
                                <label
                                  for="inline-2-radio"
                                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  i prefer not to say
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <label for="zipcode">Dob</label>

                            <input
                              type="text"
                              className={
                                emptyField.includes("dob")
                                  ? "outline outline-1 outline-red-500 transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  : "transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              }
                              onChange={(e) => setDob(e.target.value)}
                              value={dob}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-600">
                        <p className="font-medium text-lg">
                          Membership Details
                        </p>
                        <p>Please fill out all the fields.</p>
                      </div>
                      <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                          <div className="md:col-span-2">
                            <label for="zipcode">Center</label>
                            <select
                              className={
                                emptyField.includes("center")
                                  ? "outline outline-1 outline-red-500 transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  : "transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              }
                              onChange={(e) => setCenter(e.target.value)}
                              value={center}
                            >
                              <option></option>
                              {centers &&
                                centers.map((center) => (
                                  <option
                                    className="font-semibold"
                                    value={center._id}
                                  >
                                    {center.address}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <label for="zipcode">Join Date</label>
                            <div
                              className={
                                emptyField.includes("joindate")
                                  ? "outline outline-1 outline-red-500 transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  : "transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              }
                            >
                              <DatePicker
                                className="outline-none bg-inherit"
                                selected={joindate}
                                onChange={(date) => setJoindate(date)}
                              />
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <label for="zipcode">Package</label>
                            <select
                              className={
                                emptyField.includes("pack")
                                  ? "outline outline-1 outline-red-500 transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  : "transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              }
                              onChange={(e) => setPack(e.target.value)}
                              value={pack}
                            >
                              <option></option>
                              {packages &&
                                packages.map((Package) => (
                                  <option
                                    className="font-semibold"
                                    value={Package.days}
                                  >
                                    {Package.name}
                                  </option>
                                ))}
                            </select>
                          </div>



                          <div className="md:col-span-2">
                            <label for="zipcode">Martial Status</label>
                            <select
                              className={
                                emptyField.includes("paymentmethod")
                                  ? "outline outline-1 outline-red-500 transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  : "transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              }
                              onChange={(e) => setMartialstatus(e.target.value)}
                              value={martialstatus}
                            >
                              <option></option>
                              <option className="font-semibold">Married</option>
                              <option className="font-semibold">Unmarried</option>
                            </select>
                          </div>

                          
                          <div className="md:col-span-2">
                            <label for="zipcode">Start Date</label>
                            <div
                              className={
                                emptyField.includes("startdate")
                                  ? "outline outline-1 outline-red-500 transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  : "transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              }
                            >
                              <DatePicker
                                className="outline-none bg-inherit"
                                selected={startdate}
                                onChange={(date) => setStartdate(date)}
                              />
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <label for="zipcode">Payment Date</label>
                            <div
                              className={
                                emptyField.includes("paymentdate")
                                  ? "outline outline-1 outline-red-500 transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  : "transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              }
                            >
                              <DatePicker
                                className="outline-none bg-inherit"
                                selected={paymentdate}
                                onChange={(date) => setPaymentdate(date)}
                              />
                            </div>
                          </div>
                          <div className="md:col-span-1">
                            <label for="zipcode">Paid Amount</label>
                            <input
                              type="number"
                              className={
                                emptyField.includes("paidamount")
                                  ? "outline outline-1 outline-red-500 transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  : "transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              }
                              onChange={(e) => setPaidamount(e.target.value)}
                              value={paidamount}
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label for="zipcode">Payment Method</label>
                            <select
                              className={
                                emptyField.includes("paymentmethod")
                                  ? "outline outline-1 outline-red-500 transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  : "transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              }
                              onChange={(e) => setPaymentmethod(e.target.value)}
                              value={paymentmethod}
                            >
                              <option></option>
                              <option className="font-semibold">Online</option>
                              <option className="font-semibold">Cash</option>
                            </select>
                          </div>
                          
                          <div className="md:col-span-6 mt-5 ">
                            {error && (
                              <div className="error  text-center text-red-500 text-base  mb-5">
                                {error}
                              </div>
                            )}
                            <button
                            
                              type="submit"
                              className="font-bold transition-all text-lg flex items-center justify-center h-10 border mt-1 rounded px-4 w-full bg-orange-500 text-white"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberForm;
