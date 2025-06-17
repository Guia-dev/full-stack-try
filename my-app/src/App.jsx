import {useEffect, useState } from 'react'
import './index.css'; // ✅ MUST be first
//http://127.0.0.1:5500/client/public/server/
const API_URL = 'https://my-back-end-guia.onrender.com/api/users';

function App() {
  const [user, setUser] = useState([]);
  const [name, setName] = useState('');
  const [emails, setEmails] = useState('');
  const [passwords, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(API_URL).then(res => res.json()).then(setUser);
  }, []);

  const addUser = async () => {
    const existingUser = user.find(
    (u) => u.name === name && u.password === passwords
  );

    if(existingUser){
      setError('The Username and Password is taken');
      setName('');
      setPassword('')
      setEmails('')
      setTimeout(() => {
      setError('');
      }, 1000);
    }else{
    setError('Welcome!'); 
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        password: passwords,
        email: emails
      })
    });
    setName('');
    setPassword('')
    setEmails('')
    const res = await fetch(API_URL).then(res => res.json());
    setUser(res)
    }
  }

  return(
    <>
    <div className='grid place-content-center min-h-screen'>
      <h1 className='text-center text-2xl'>Register</h1>
      <div className=''>
        <h1>Username</h1>
        <input value={name} className='placeholder:text-center border-2 border-black' onChange={e => setName(e.target.value)} />
        <h1>Email</h1>
        <input value={emails} type='email' className='placeholder:text-center border-2 border-black' onChange={e => setEmails(e.target.value)} />
        <h1>Password</h1>
        <input value={passwords} type='password' className='placeholder:text-center border-2 border-black' onChange={e => setPassword(e.target.value)} />
      </div>
      <div className='grid place-content-center'>
        <button className='bg-emerald-600 mt-4 w-20' onClick={addUser}>Register</button>
      </div>

      {error && <p className="text-red-600 text-center">{error}</p>}
    </div>
    
    </>
  )
}

export default App