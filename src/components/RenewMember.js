import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import { parseISO } from "date-fns";

function RenewMember() {
  const location = useLocation();
  const [packages, setPackages] = useState(null);
  const datestart = parseISO(location.state.startdate);
  const datepaymentt = parseISO(location.state.paymentdate);
  const dateexpired = parseISO(location.state.expiredate);

  const navigate = useNavigate();

  const [pack, setPack] = useState(location.state.pack);
  const [startdate, setStartdate] = useState(datestart);
  const [paidamount, setPaidamount] = useState(location.state.paidamount);
  const [paymentdate, setPaymentdate] = useState(datepaymentt);
  const [paymentmethod, setPaymentmethod] = useState(
    location.state.paymentmethod
  );
  const [expiredate, setExpiredate] = useState(dateexpired);
  const [status, setStatus] = useState(location.state.status);
  const [error, setError] = useState(null);
  const [emptyField, setEmptyField] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const response = await fetch("https://gms-backend-cj6n.onrender.com/api/package/");
      const json = await response.json();

      if (response.ok) {
        setPackages(json);
      }
    };
    fetchPackages();

    if (pack && startdate) {
      const day = parseInt(pack);
      const startDate = new Date(startdate);

      // Calculate the future date by adding the 'pack' number of days to the 'startdate'
      const futureDate = new Date(startDate);
      futureDate.setDate(startDate.getDate() + day);
      setExpiredate(futureDate);
    }
  }, [location, pack, startdate]);

  const hadlesubmit = async (e) => {
    e.preventDefault();

    const selectedPackage = packages.find((pkg) => pkg.days === parseInt(pack));

    if (!selectedPackage) {
      setError("Invalid package selected");
      return;
    }
  
    // Update offerprice with the price from the selected package
    const updatedOfferPrice = selectedPackage.price;
  
      const dues = (updatedOfferPrice-paidamount)

    const formData = new FormData(); // Create a FormData object to send the image
    formData.append("pack", pack);
    formData.append("offerprice", updatedOfferPrice);
    formData.append("startdate", startdate);
    formData.append("paidamount", paidamount);
    formData.append("dues", dues);
    formData.append("paymentdate", paymentdate);
    formData.append("paymentmethod", paymentmethod);
    formData.append("expiredate", expiredate);
    formData.append("status", status);

    const response = await fetch("https://gms-backend-cj6n.onrender.com/api/member/" + location.state._id, {
      method: "PATCH",
      body: formData,
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
      setPack("");
      setStartdate("");
      setPaidamount("");
      setPaymentdate("");
      setPaymentmethod("");
      setExpiredate("");
      setStatus("");

      if (json.emptyField === undefined) {
        setEmptyField([]);
      } else {
        setEmptyField(json.emptyField);
      }

      navigate("/expired");
    }
  };

  return (
    <div>
      <div className="p-4 sm:ml-64 ">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14 ">
          <i>
            <Link to="/expired">
              <img
                className="w-7 h-7 "
                src="https://cdn-icons-png.flaticon.com/512/786/786197.png"
                alt="back"
              />
            </Link>
          </i>
          <div className="flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
              <div>
                <h2 className="font-bold text-2xl text-gray-600 mb-5">
                  Renew Member
                </h2>

                <form onSubmit={hadlesubmit} encType="multipart/form-data">
                  <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                      <div className="text-gray-600">
                        <p className="font-medium text-lg">Renew Details</p>
                        <p>Please fill out all the fields.</p>
                      </div>
                      <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                          <div className="md:col-span-2">
                            <label for="zipcode">Package</label>
                            <select
                              className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
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
                            <label for="zipcode">Start Date</label>
                            <div className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                              <DatePicker
                                className="outline-none bg-inherit"
                                selected={startdate}
                                onChange={(date) => setStartdate(date)}
                              />
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <label for="zipcode">Payment Date</label>
                            <div className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50">
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
                              className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              onChange={(e) => setPaidamount(e.target.value)}
                              value={paidamount}
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label for="zipcode">Payment Method</label>
                            <select
                              className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              onChange={(e) => setPaymentmethod(e.target.value)}
                              value={paymentmethod}
                            >
                              <option></option>
                              <option className="font-semibold">Online</option>
                              <option className="font-semibold">Cash</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <label for="zipcode">Expire Status</label>
                            <select
                              className={
                                emptyField.includes("status")
                                  ? "outline outline-1 outline-red-500 transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  : "transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              }
                              onChange={(e) => setStatus(e.target.value)}
                              value={status}
                            >
                              <option></option>

                              <option>Expired</option>
                              <option>Unexpired</option>
                            </select>
                          </div>
                          <div className="md:col-span-6 mt-5 ">
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

export default RenewMember;
