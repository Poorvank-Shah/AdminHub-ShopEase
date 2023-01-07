import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";

export default function UserList() {
  let [users, setUsers] = useState([])
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    const getTransacion = async () => {
      try {
        const res = await userRequest.get("orders/transaction");
        setTransaction(res.data);
      } catch { }
    };
    getTransacion();
  }, []);

  // ((transaction.map((e) => {
  //   console.log(e._id + "and" + e.total);
  // })))


  // console.log(transaction[transaction.findIndex((item)=>item._id === '63b19455461916517bf8d415')].total)
  // console.log(transaction[3].total)
  // console.log(transaction.find((element)=>{element._id === '63b19455461916517bf8d415'}).total)


  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/");
        console.log(res.data)
        setUsers(res.data);
      }
      catch {

      }
    }
    getUsers();
  }, [])

  const handleDelete = (id) => {
    const deleteUser = async (id) => {
      try {
        const res = await userRequest.delete(`users/${id}`);
        let temp = [...users];
        temp.splice(users.findIndex((item) => item._id === id), 1)
        setUsers(temp);
      }
      catch { }
    }

    // users.splice(users.findIndex((item) => item._id === id),1)
    // here this was showing error show we have to use temp array to do changes

    deleteUser(id);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img ||
              "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
            } alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 100,
    },
    {
      field: "transaction",
      headerName: "Transaction \n Volume (in ₹)",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            {transaction.findIndex((item) => item._id === params.row._id) !== -1 ? transaction[transaction.findIndex((item) => item._id === params.row._id)].total : 0}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const [pageSize, setPageSize] = useState(8);
  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[8, 10, 15]}
        onPageSizeChange={(newPageSize) =>
          setPageSize(newPageSize)}
        checkboxSelection
      />
    </div>
  );
}
