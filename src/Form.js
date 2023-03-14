import React, { useState, useEffect } from "react";

function Form() {
  const [formData, setFormData] = useState({
    firsthand: "",
    basename: "",
    date: "",
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });// Spred operation
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json()) 
      .then((data) => {
        console.log(data);
      })  
      .catch((error) => {
        console.error(error);
      });
  };

  

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          console.log(formData);
        }
      }, [formErrors]);
      const validate = (values) => {
        const errors = {};
        if (!values.firstname) {
          errors.firstname = "FirstName is required!";
        }
        if (!values.lastname) {
          errors.lastname = "LastName is required!";
        } 
        if (!values.date) {
          errors.date = "Date is required";
        } 
        return errors;
      };
    
  return (
    <form onSubmit={handleSubmit}  className="needs-validation" ><br/>
      <label>
        FirstName:
        <input
          type="text"
          name="firstname"
          onChange={handleChange}
          className="from-control"
          // required
        />
        {formErrors.firstname && <p style={{color:"red"}}>{formErrors.firstname}</p>}
      </label>
      <br />
      {/* <  div className="was-validated"> */}
        <label>
          LastName:
          <input
            type="text"
            name="lastname"
            onChange={handleChange}
            className="from-control"
          //  required
          />
          {formErrors.lastname && <p style={{color:"red"}}>{formErrors.lastname}</p>}
        </label>
      {/* </div> */}
      <br />
      <label>
        Date:
        <input
          type="date"
          name="date"
          onChange={handleChange}
          className="from-control"
          // required
        />
        {formErrors.date && <p style={{color:"red"}}>{formErrors.date}</p>}
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
