import React, { useEffect, useState } from 'react';
import { authFetch } from '../../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

console.log('users', users)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await authFetch('/users');

        if (!response.ok) {
          throw new Error('Failed to fetch users.')
        }

        const data = await response.json();
        setUsers(data.users || data);
      } catch (err) {
        setError(err.message)
        console.error("Error fetching users:", err)
      } finally {
        setLoading(false);
      }
    }

    fetchUsers()
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')){
      return
    }

    try {
      setDeleteLoading(userId)
      const response = await authFetch(`/users/${userId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers(users.filter(item =>(item.id || userId._id) !== userId))
    } catch (err) {
      alert('Error delete user: ' + err.message)
      console.error("Error deleting users:", err)
    } finally {
      setDeleteLoading(null)
    }
  };


  return (
    <div className="bg-[#111827] min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Users Detail</h1>
          {/* <p className='text-white'>Total users: {users.length}</p> */}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Avatar
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {users.map((item, i) => {
                const userId = item.id || item._id;
                return(
                  <tr className="hover:bg-gray-700 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-white text-xl font-bold">
                        S
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{item.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteUser(userId)}
                          disabled={deleteLoading === userId}
                          className="cursor-pointer bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-3 py-1 rounded text-sm transition-colors duration-200 flex items-center gap-1"
                        >
                          {deleteLoading === userId ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                              Deleting...
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                              Delete
                            </>
                          )}
                        </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users