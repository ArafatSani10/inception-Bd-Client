import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiEye, FiTrash2 } from 'react-icons/fi';

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(15);
  const [orderBy, setOrderBy] = useState('Latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        const students = res.data.data.filter((u) => u.role === 'student');
        setUsers(students);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter, search & sort
  useEffect(() => {
    let tempUsers = [...users];

    // Search filter
    if (searchTerm) {
      tempUsers = tempUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Order By
    tempUsers.sort((a, b) => {
      if (orderBy === 'Latest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

    setFilteredUsers(tempUsers);
    setCurrentPage(1);
  }, [users, searchTerm, orderBy]);

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (num) => setCurrentPage(num);

  // ✅ Smart pagination function for millions of users
  const getVisiblePages = (currentPage, totalPages) => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (currentPage > 4) pages.push('...');

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 3) pages.push('...');

    pages.push(totalPages);

    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse w-12 h-12 bg-blue-400 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 text-gray-800 dark:text-white">
      <div className="bg-white dark:bg-gray-800 p-6 shadow-xl rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#00baff]">All Students</h1>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
          </select>
          <select
            value={usersPerPage}
            onChange={(e) => setUsersPerPage(Number(e.target.value))}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-transparent">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-700 dark:text-white">
                <th className="py-3 px-4">SN</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone Number</th>
                <th className="py-3 px-4">Joined At</th>
                <th className="py-3 px-4">StudentID</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentUsers.map((user, idx) => (
                <tr
                  key={user._id || user.id}
                  className="bg-white dark:bg-gray-800 hover:shadow-md transition-all rounded-md"
                >
                  <td className="py-3 px-4">{indexOfFirstUser + idx + 1}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.phone || 'N/A'}</td>
                  <td className="py-3 px-4">{new Date(user.createdAt).toLocaleString()}</td>
                  <td className="py-3 px-4">{user.id}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-white'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-white'
                      }`}
                    >
                      {user.status || 'Not verified'}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-500 transition">
                      <FiEye />
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-500 transition">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-6 gap-2 flex-wrap">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
          >
            Prev
          </button>

          {getVisiblePages(currentPage, totalPages).map((page, index) =>
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-3 py-1">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md font-medium ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUser;










// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { FiEye, FiTrash2 } from 'react-icons/fi';

// const AllUser = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [usersPerPage, setUsersPerPage] = useState(15);
//   const [orderBy, setOrderBy] = useState('Latest');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
//         // Filter only students
//         const students = res.data.data.filter(u => u.role === 'student');
//         setUsers(students);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // Filter, search & sort
//   useEffect(() => {
//     let tempUsers = [...users];

//     // Search filter
//     if (searchTerm) {
//       tempUsers = tempUsers.filter(
//         user =>
//           user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.email.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Order By
//     tempUsers.sort((a, b) => {
//       if (orderBy === 'Latest') {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       } else {
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       }
//     });

//     setFilteredUsers(tempUsers);
//     setCurrentPage(1); // search/order change হলে page reset
//   }, [users, searchTerm, orderBy]);

//   // Pagination
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//   const handlePageChange = (num) => setCurrentPage(num);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-pulse w-12 h-12 bg-blue-400 rounded-full"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 text-gray-800 dark:text-white">
//       <div className="bg-white dark:bg-gray-800 p-6 shadow-xl rounded-2xl">
//         <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#00baff]">All Students</h1>

//         {/* Filter Bar */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Search by name or email"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           />
//           <select
//             value={orderBy}
//             onChange={(e) => setOrderBy(e.target.value)}
//             className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           >
//             <option value="Latest">Latest</option>
//             <option value="Oldest">Oldest</option>
//           </select>
//           <select
//             value={usersPerPage}
//             onChange={(e) => setUsersPerPage(Number(e.target.value))}
//             className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           >
//             <option value={5}>5 per page</option>
//             <option value={10}>10 per page</option>
//             <option value={20}>20 per page</option>
//           </select>
//         </div>

//         {/* User Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full table-auto bg-transparent">
//             <thead>
//               <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-700 dark:text-white">
//                 <th className="py-3 px-4">SN</th>

//                 <th className="py-3 px-4">Name</th>
//                 <th className="py-3 px-4">Email</th>
//                 <th className="py-3 px-4">Phone Number</th>
//                 <th className="py-3 px-4">Joined At</th>
//                 <th className="py-3 px-4">StudentID</th> {/* ID Column */}
//                 <th className="py-3 px-4">Status</th>
//                 <th className="py-3 px-4">Action</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//               {currentUsers.map((user, idx) => (
//                 <tr key={user._id || user.id} className="bg-white dark:bg-gray-800 hover:shadow-md transition-all rounded-md">
//                   <td className="py-3 px-4">{indexOfFirstUser + idx + 1}</td>

//                   <td className="py-3 px-4">{user.name}</td>
//                   <td className="py-3 px-4">{user.email}</td>
//                   <td className="py-3 px-4">{user.phone || 'N/A'}</td>
//                   <td className="py-3 px-4">{new Date(user.createdAt).toLocaleString()}</td>
//                   <td className="py-3 px-4">{user.id}</td> {/* Show User ID */}
//                   <td className="py-3 px-4">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Active'
//                         ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-white'
//                         : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-white'
//                       }`}>
//                       {user.status || "Not verified"}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 flex gap-2">
//                     <button className="text-blue-600 dark:text-blue-400 hover:text-blue-500 transition"><FiEye /></button>
//                     <button className="text-red-600 dark:text-red-400 hover:text-red-500 transition"><FiTrash2 /></button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-end mt-6 gap-2">
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
//             <button
//               key={num}
//               onClick={() => handlePageChange(num)}
//               className={`px-3 py-1 rounded-md font-medium ${currentPage === num
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-white text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
//                 }`}
//             >
//               {num}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllUser;
