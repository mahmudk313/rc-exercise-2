import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { addUser,getUsers } from "./store/slices/UsersSlice";
//import components
import Controls from "./Components/Layout/Controls";
import ListShow from "./Components/User/ListShow";
import AddBox from "./Components/AddBox";
import axios from "axios";

function App() {

  const dispatch = useDispatch();
  const [addStatus, setAddStatus] = useState(false);
  const [usersListStatus, setUsersListStatus] = useState(true);

  useEffect(() => {
    getUsersList();
  },[])
  
  const getUsersList = async () => {
    try{
      let list = await axios.get(`https://6287ab4260c111c3ead01bd8.endapi.io/usersList`)
      dispatch(getUsers(list.data.data))
    } catch (error) {
      console.log(error)
    }
  }
  
  //state changes here and get the props from AddBox component after successfuly sending data to API
  let addUsers = async (user) => {
    const joinDate = new Date().toLocaleDateString("fa-IR");
    user.key = Date.now();
    user.joinDate = joinDate;

    try {
      let res = await axios.post(`https://6287ab4260c111c3ead01bd8.endapi.io/usersList`, user)
      dispatch(addUser(res.data.data))
    } catch(error) {
      console.log(error)
    }
    
  };

  //changes the addStatus, get value from Controls component -> add Button
  const addStatusToggle = (status) => {
    setAddStatus(status);
  };

  let listShowToggle = (e) => {
    setUsersListStatus(!usersListStatus);
  };

  return (
    <main>
      <div className={addStatus ? "blur" : ""}>
        <Controls addStatus={addStatusToggle} listShowToggle={listShowToggle} />

        {usersListStatus ? (
          <ListShow />
        ) : (
          ""
        )}
      </div>
      {addStatus ? <AddBox addStatus={addStatusToggle} add={addUsers} /> : ""}
    </main>
  );
}

export default App;
