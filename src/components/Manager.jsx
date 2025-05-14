import React, { useState, useEffect } from 'react'
import { Rocket, Eye, EyeOff, ClipboardCopy, Check, Pencil, Trash2, ChevronDown } from 'lucide-react';

import { Bounce, ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [submitted, setSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [copiedIndex, setCopiedIndex] = useState({})
  const [expandedCard, setExpandedCard] = useState(null)




  useEffect(() => {
    let rawData = localStorage.getItem("passwords")
    if (rawData && rawData.startsWith("[") && rawData.endsWith("]")) {
      try {
        const parsed = JSON.parse(rawData)
        if (Array.isArray(parsed)) setPasswordArray(parsed)
        else setPasswordArray([])
      } catch (e) {
        console.warn("Could not parse saved passwords", e)
        setPasswordArray([])
      }
    } else setPasswordArray([])
  }, [])


  const extractKeyword = (url) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '')
      const keyword = domain.split('.')[0]
      return keyword.charAt(0).toUpperCase() + keyword.slice(1)
    } catch {
      return "Website"
    }
  }

const handleSubmit = () => {
  // Show a loading spinner or any feedback (submitted state)
  setSubmitted(true);
  setTimeout(() => setSubmitted(false), 1500);

  


  // Check if all fields are empty
  if (!form.site && !form.username && !form.password) {
    toast.error("❌ All fields are empty. Please fill at least one.", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });
    return;
  }

  // Check if password is empty
  if (!form.password) {
    toast.error("❌ Password is required to save.", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });
    return;
  }


 

  // Create new password entry after validation
  const newPassword = {
    id: Date.now(),
    site: form.site,
    username: form.username,
    password: form.password,
  };

  // Update the password list
  const newPasswords = [...passwordArray, newPassword];
  setPasswordArray(newPasswords);
  localStorage.setItem("passwords", JSON.stringify(newPasswords));

  // Clear form inputs
  setForm({ site: "", username: "", password: "" });

  // Show success toast
  toast.success("✅ Password submitted!", {
    position: "top-center",
    autoClose: 3000,
    theme: "dark",
    transition: Bounce,
  });
};


  const editpassword = (id) => {
    setForm(passwordArray.filter(i => i.id === id)[0])
    setPasswordArray(passwordArray.filter(item => item.id !== id))
  }

  const deletepassword = (id) => {
    const newPasswords = passwordArray.filter(item => item.id !== id);
    setPasswordArray(newPasswords);
    localStorage.setItem("passwords", JSON.stringify(newPasswords));
    toast.success('Password deleted', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCopy = (text, index, field) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex({ index, field })
    setTimeout(() => setCopiedIndex({}), 2000)
    toast.success('Copied to Clipboard!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  }



  return (
    <>
      <ToastContainer theme="dark" transition={Bounce} />

      <div className="md:mycontainer text-white">

        {/* Header */}
        <div className="mt-6 bg-gradient-to-tr from-[#0e0c21] to-[#131024] rounded-xl shadow-[0_0_25px_#a259ff60] px-6 py-4">
          <div className="text-2xl text-yellow-300 font-extrabold flex justify-center items-center drop-shadow-[0_0_6px_#fffa]">
            <span className="text-pink-700">&lt;</span>Pass<span className="text-pink-700">OP/&gt;</span>
          </div>
          <p className="text-center text-purple-400 font-bold text-lg mt-1">Your Own Password Manager!</p>

          {/* Form */}
          <div className='border border-[#a259ff] bg-black/70 rounded-xl p-6 mt-4 max-w-[95%] md:max-w-[65%] mx-auto backdrop-blur-sm shadow-[0_0_20px_#a259ff40]'>
            <div className='flex flex-col  gap-4'>
              <input value={form.site} onChange={handleChange} name='site' placeholder="Enter Website"
                className="w-full border border-fuchsia-500 bg-black text-cyan-400 placeholder-fuchsia-500 p-3 rounded-lg" />
              <div className='flex md:flex-row flex-col gap-4  '>
                <div className='md:w-3/4 w-full'>
                  <input value={form.username} onChange={handleChange} name='username' placeholder="Username"
                    className=" w-full border border-fuchsia-500 bg-black text-cyan-400 placeholder-fuchsia-500 p-3 rounded-lg" />
                </div>
                <div className=" relative md:w-1/2 w-full">
                  <input value={form.password} onChange={handleChange} name='password' placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    className="w-full border border-fuchsia-500 bg-black text-cyan-400 placeholder-fuchsia-500 p-3 pr-10 rounded-lg" />
                  <div onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-yellow-300 hover:text-pink-500">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <button onClick={handleSubmit}
                  className="flex items-center gap-2 bg-[#18042c] text-yellow-300 border border-[#a259ff] px-5 py-2 rounded-lg font-bold hover:scale-105 active:scale-95">
                  {submitted ? 'Submitted ✅' : 'Submit'}
                  {!submitted && <Rocket className="animate-bounce text-yellow-300" size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Password List */}
        <h2 className='text-2xl mt-10 text-center text-cyan-400 font-semibold tracking-wide animate-fade-in'>
          PASSWORD LIST
        </h2>

        {/* Desktop View (Table) */}
        <div className="hidden sm:block">
          {passwordArray.length === 0 ? (
            <div className="w-[65%] text-center mx-auto mt-6 p-4 text-xl rounded-xl overflow-hidden backdrop-blur-md bg-black/30 border border-purple-500/30 shadow-[0_0_20px_#a855f7] animate-fade-in-up">
              No Password to Show
            </div>
          ) : (
            <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] mx-auto mt-6 rounded-xl overflow-hidden backdrop-blur-md bg-black/30 border border-purple-500/30 shadow-[0_0_20px_#a855f7] animate-fade-in-up">
              <table className="w-full text-white text-sm table-fixed">
                <thead>
                  <tr className="text-center text-fuchsia-500 text-base bg-black/40">
                    <th className="p-3 text-left w-[30%]">Website</th>
                    <th className="p-3 text-left w-[22%]">Username</th>
                    <th className="p-3 text-left w-[20%]">Password</th>
                    <th className="p-3 w-[20%]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {passwordArray.map((item, index) => (
                    <tr key={index} className="hover:bg-purple-400/10 transition duration-200">
                      <td className="p-3 text-cyan-300 text-left">
                        <div className="flex items-center text-left justify-between gap-2">
                          <a
                            href={item.site}
                            target="_blank"
                            rel="noreferrer"
                            className="block truncate w-full"
                            title={item.site}
                          >
                            {item.site}
                          </a>
                          <span
                            onClick={() => handleCopy(item.site, index, 'site')}
                            className="cursor-pointer text-yellow-300 hover:text-pink-400 flex-shrink-0 mr-7 pl-5 "
                          >
                            {copiedIndex.index === index && copiedIndex.field === 'site' ? <Check size={16} /> : <ClipboardCopy size={16} />}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-yellow-300 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate w-full text-left" title={item.username}>
                            {item.username}
                          </span>
                          <span
                            onClick={() => handleCopy(item.username, index, 'username')}
                            className="cursor-pointer text-yellow-300 hover:text-pink-400 flex-shrink-0 pr-10"
                          >
                            {copiedIndex.index === index && copiedIndex.field === 'username' ? <Check size={16} /> : <ClipboardCopy size={16} />}
                          </span>
                        </div>
                      </td>
                      <td className=" text-pink-400 text-left">
                        <div className="flex items-center justify-evenly text-center gap-0">
                          <span className="truncate w-[75%]  text-left" title={item.password}>
                            {item.password}
                          </span>
                          <span
                            onClick={() => handleCopy(item.password, index, 'password')}
                            className="cursor-pointer text-yellow-300 hover:text-pink-400 flex-shrink-0  "
                          >
                            {copiedIndex.index === index && copiedIndex.field === 'password' ? <Check size={16} /> : <ClipboardCopy size={16} />}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center items-center gap-4">
                          <span
                            className="cursor-pointer text-pink-400 hover:text-yellow-300 transition"
                            onClick={() => editpassword(item.id)}
                          >
                            <Pencil size={18} />
                          </span>
                          <span
                            className="cursor-pointer text-pink-400 hover:text-red-700 transition"
                            onClick={() => { setDeleteId(item.id); setShowConfirm(true); }}
                          >
                            <Trash2 size={18} />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          )}
        </div>

        {/* Mobile View (Cards) */}
        <div className="sm:hidden mt-6 px-4 space-y-4">
          {passwordArray.length === 0 ? (
            <div className="text-center text-lg text-purple-300">No Password to Show</div>
          ) : (
            passwordArray.map((item, index) => {
              const keyword = extractKeyword(item.site);
              const isOpen = expandedCard === index;
              return (
                <div
                  key={item.id}
                  className="bg-black/30 backdrop-blur-md border border-purple-500/30 shadow-[0_0_15px_#a855f7] rounded-xl p-4 transition-all"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setExpandedCard(isOpen ? null : index)}
                  >
                    <h3 className="text-cyan-300 font-bold">{keyword}</h3>
                    <ChevronDown className={`text-yellow-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
                  </div>

                  {isOpen && (
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between items-center text-yellow-300">
                        <span className="font-medium">Website:</span>
                        <div className="flex items-center gap-1">
                          <span className="truncate max-w-[180px]">
                            <a href={item.site} target="_blank" rel="noreferrer" className="block truncate min-w-[100px] max-w-[250px] text-left" title={item.site}>{item.site}</a></span>
                          <span onClick={() => handleCopy(item.site, index, 'site')} className="cursor-pointer">
                            {copiedIndex.index === index && copiedIndex.field === 'site' ? <Check size={16} /> : <ClipboardCopy size={16} />}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-yellow-300">
                        <span className="font-medium">Username:</span>
                        <div className="flex items-center gap-1">
                          <span className="truncate max-w-[150px]">{item.username}</span>
                          <span onClick={() => handleCopy(item.username, index, 'username')} className="cursor-pointer">
                            {copiedIndex.index === index && copiedIndex.field === 'username' ? <Check size={16} /> : <ClipboardCopy size={16} />}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-pink-400">
                        <span className="font-medium">Password:</span>
                        <div className="flex items-center gap-1">
                          <span className="truncate max-w-[150px]">{item.password}</span>
                          <span onClick={() => handleCopy(item.password, index, 'password')} className="cursor-pointer">
                            {copiedIndex.index === index && copiedIndex.field === 'password' ? <Check size={16} /> : <ClipboardCopy size={16} />}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 flex gap-4">
                        <button onClick={() => editpassword(item.id)} className="text-yellow-300">
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => { setDeleteId(item.id); setShowConfirm(true); }} className="text-red-500">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>








      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0e0c21] border border-[#a259ff80] shadow-[0_0_40px_#a259ff60] rounded-2xl p-6 w-[90%] max-w-sm text-center animate-fade-in-up transition-all">

            <div className="text-yellow-300 text-xl font-bold mb-2 tracking-wide">Confirm Delete</div>

            <p className="text-purple-300 text-sm mb-6">Are you sure you want to Delete this?</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  deletepassword(deleteId);
                  setShowConfirm(false);
                  setDeleteId(null);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-lg shadow-red-500/30 transition hover:scale-105 active:scale-95"
              >
                Delete
              </button>

              <button
                onClick={() => {
                  setShowConfirm(false);
                  setDeleteId(null);
                }}
                className="bg-transparent border border-purple-500 text-purple-300 hover:text-pink-400 px-4 py-2 rounded-lg font-semibold transition hover:scale-105 active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Manager
