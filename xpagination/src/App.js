import  { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

export default function App() {
  const [users, setUsers] = useState([]);
  const [userPerPage, setUserPerPage] = useState(10);
  const [userPrint, setUserPrint] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const apiCall = async () => {
    try {
      const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      setUsers(response.data);
    } catch (error) {
      alert('failed to fetch data');
    }
  };

  useEffect(() => {
    apiCall();
    const startIndex = (pageNo - 1) * userPerPage;
    const endIndex = startIndex + userPerPage;
    setUserPrint(users.slice(startIndex, endIndex));
  }, [pageNo, userPerPage, users]);

  const previousToggle = () => {
    if (pageNo > 1) {
      setPageNo((prev) => prev - 1);
    }
  };

  const nextToggle = () => {
    if (pageNo < Math.ceil(users.length / userPerPage)) {
      setPageNo((prev) => prev + 1);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className='th1'>ID</th>
            <th className='th2'>Name</th>
            <th className='th3'>Email</th>
            <th className='th4'>Role</th>
          </tr>
        </thead>
        <tbody>
          {userPrint.map((user) => (
            <tr key={user.id}>
              <td className='th5 thAll'>{user.id}</td>
              <td className='th6 thAll'>{user.name}</td>
              <td className='th7 thAll'>{user.email}</td>
              <td className='th8 thAll'>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button type='button' onClick={previousToggle}>
          Previous
        </button>
        <p>{pageNo}</p>
        <button
          type='button'
          onClick={nextToggle}
        >
          Next
        </button>
      </div>
    </div>
  );
}