
import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const AddContact = () =>{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // getting data from redux
  const contacts = useSelector((state) => state)
  console.log(contacts)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //handeling submit and validations
  const handleSubmit = (e) => {
    e.preventDefault();
      // check if email, number and name are valid and are not empty
      if(!email || !phone || !name){
          return toast.warning('Please fill in all fields')
      }

      // if a contact inside contact contains a similar email, the return email (&& email)
      const checkEmail = contacts.find(contact => contact.email === email && email)
      const checkPhone = contacts.find(contact => contact.phone === parseInt(phone) && phone)

      //incase email exist
      if(checkEmail){
        return toast.error('Email already exist')
      }
      if(checkPhone){
        return toast.error("Phone already exist")
      }

      const data = {
        id: contacts[contacts.length - 1].id +1,
        name,
        email,
        phone
      }

      dispatch({type: "ADD_CONTACT", payload: data})

      toast.success('Contact Added Successfuly')

      navigate('/')
  }

    return (
        <div className="container-fluid">
          <h1 className="text-center text-dark py-3 display-2">Add Post</h1>
          <div className="row">
            <div className="col-md-6 p-5 mx-auto shadow">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="btn btn-block btn-dark"
                    type="submit"
                    value="Add Student"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    };

export default AddContact;