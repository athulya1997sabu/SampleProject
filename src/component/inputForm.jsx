import React, { useState } from "react";
import "./inputForm.css";
import axios from "axios";
function InputForm() {
  const [useData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        useData
      );
      setUserData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error", error);
    }
  };
  // const handleSubmit = async (e) => {
  //   try {
  //     const response = await fetch("url", {
  //      method:'POST',
  //      headers:{'Content-Type' : 'application/json'},
  //      body: JSON.stringify(useData)
  //     });
  //     if (!response.ok) throw new Error("Submission failed");
  //     setUserData({
  //       name: "",
  //       email: "",
  //       password: "",
  //     });
  //   } catch (error) {
  //     console.Error("ERROR");
  //   }
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...useData, [name]: value });
    validateInput(name, value);
  };
  const validateInput = (name, value) => {
    let error = "";
    if (name === "name" && value.length <= 3) {
      error = "Name should have length grater thaan 3";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Email is invalid";
    } else if (name === "password" && value.length < 6) {
      error = "Password must be at least 6 characters long.";
    }
    setErrors((prevError) => ({ ...prevError, [name]: error }));
  };
  return (
    <div className="form-container">
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-grp">
          <label>Name</label>
          <input
            type="text"
            value={useData.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div className="form-grp">
          <label>Email</label>
          <input
            type="text"
            value={useData.email}
            name="email"
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="form-grp">
          <label>Password</label>
          <input
            type="text"
            value={useData.password}
            name="password"
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button
          type="submit"
          disabled={
            errors.name || errors.email || errors.password ? true : false
          }
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default InputForm;

// import React, { useState } from 'react';

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [apiError, setApiError] = useState('');

//   // Handle input changes (controlled components)
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Perform validation on input change
//     validateInput(name, value);
//   };

//   // Validate individual inputs
//   const validateInput = (name, value) => {
//     let error = '';
//     if (name === 'name' && value.length < 3) {
//       error = 'Name must be at least 3 characters long.';
//     } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
//       error = 'Please enter a valid email.';
//     } else if (name === 'password' && value.length < 6) {
//       error = 'Password must be at least 6 characters long.';
//     }
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
//   };

//   // Check if the form has any validation errors
//   const hasErrors = () => {
//     return Object.values(errors).some((error) => error) ||
//            Object.values(formData).some((field) => field === '');
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setApiError('');
//     setSuccessMessage('');

//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) throw new Error('Submission failed.');

//       setSuccessMessage('Registration successful!');
//       setFormData({ name: '', email: '', password: '' }); // Reset form
//     } catch (error) {
//       setApiError(error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="form-container">
//       <h1>User Registration</h1>

//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           {errors.name && <p className="error">{errors.name}</p>}
//         </div>

//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           {errors.email && <p className="error">{errors.email}</p>}
//         </div>

//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           {errors.password && <p className="error">{errors.password}</p>}
//         </div>

//         <button type="submit" disabled={hasErrors() || isSubmitting}>
//           {isSubmitting ? 'Submitting...' : 'Register'}
//         </button>
//       </form>

//       {successMessage && <p className="success">{successMessage}</p>}
//       {apiError && <p className="error">{apiError}</p>}

//       {/* Styles */}
//       <style>{`
//         .form-container {
//           max-width: 400px;
//           margin: 50px auto;
//           padding: 20px;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           background-color: #f9f9f9;
//         }
//         .form-group {
//           margin-bottom: 15px;
//         }
//         label {
//           display: block;
//           margin-bottom: 5px;
//         }
//         input {
//           width: 100%;
//           padding: 8px;
//           margin-bottom: 5px;
//         }
//         .error {
//           color: red;
//           font-size: 0.9em;
//         }
//         .success {
//           color: green;
//           font-size: 1em;
//           margin-top: 15px;
//         }
//         button {
//           width: 100%;
//           padding: 10px;
//           background-color: #007bff;
//           color: white;
//           border: none;
//           border-radius: 5px;
//           cursor: pointer;
//         }
//         button:disabled {
//           background-color: #ccc;
//           cursor: not-allowed;
//         }
//         @media (max-width: 600px) {
//           .form-container {
//             margin: 20px;
//             padding: 15px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default RegistrationForm;
