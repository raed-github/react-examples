import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { toast }  from 'react-toastify'

const EditContact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
  
    const contacts = useSelector((state) => state)
    console.log(contacts)

    //load current contact from redux store
    const { id } = useParams()
    const currentContact = contacts.find(contact => contact.id === parseInt(id));

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      if(currentContact){
        setName(currentContact.name)
        setEmail(currentContact.email)
        setPhone(currentContact.email)
      }
    },currentContact)

    const handleSubmit = (e) => {
      e.preventDefault();
        // check if email, number and name are valid and are not empty
        if(!email || !phone || !name){
            return toast.warning('Please fill in all fields')
        }
  
        // if a contact inside contact contains a similar email, the return email (&& email)
        const checkEmail = contacts.find(contact => contact.id != id && contact.email === email )
        const checkPhone = contacts.find(contact => contact.id != id && contact.phone === parseInt(phone))
  
        //incase email exist
        if(checkEmail){
          return toast.error('Email already exist')
        }
        if(checkPhone){
          return toast.error("Phone already exist")
        }
  
        const data = {
          id: parseInt(id),
          name,
          email,
          phone
        }
  
        dispatch({type: "UPDATE_CONTACT", payload: data})
  
        toast.success('Contact Updated Successfuly')
  
        navigate('/')
    }
  
    return (
      <div className="container">
        <div className="row d-flex flex-column">
          <button
            className="btn btn-dark ml-auto my-5"
            onClick={() => navigate("/")}
          >
            Go back
          </button>
          <div className="col-md-6 mx-auto shadow p-5">
            {currentContact ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    className="form-control"
                    value={name}
                    placeholder={"Name"}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    value={email}
                    placeholder={"Email"}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    value={phone}
                    placeholder={"Phone"}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group d-flex align-items-center justify-content-between my-2">
                  <button type="submit" className="btn btn-primary">
                    Update Contact
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => navigate("/")}
                  >
                    cancel
                  </button>
                </div>
              </form>
            ) : (
              <h1 className="text-center">No Contact Found</h1>
            )}
          </div>
        </div>
      </div>
    );
  
    };

    export default EditContact;