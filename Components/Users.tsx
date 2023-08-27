import userServices, { UserData } from "../services/userServices";
import useUsers from "../hooks/useUsers";

function Users() {
  const { isLoading, error, users, setError, setUser } = useUsers();
  const userDelete = (user: UserData) => {
    const originalUsers: UserData[] = [...users];

    setUser(users?.filter((e) => e.id !== user.id));

    userServices.delete(user.id).catch((error) => {
      setError(error.message), setUser(originalUsers);
    });
  };

  const updateUser = (user: UserData) => {
    const originalUsers: UserData[] = [...users];
    const updateUser = { ...user, name: user.name + "!" };
    setUser(users.map((u) => (u.id === user.id ? updateUser : u)));

    userServices.update(user).catch((error) => {
      setError(error.message), setUser(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers: UserData[] = [...users];
    const newUser: UserData = { id: 0, name: "Daniel Yadghar" };
    setUser([newUser, ...users]);

    userServices
      .create(newUser)
      .then(({ data: savedUser }) => {
        setUser([savedUser, ...users]);
      })
      .catch((error) => {
        setError(error.message);
        setUser(originalUsers);
      });
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-grow"></div>}
      <button className="btn btn-primary mb-3 " onClick={addUser}>
        Add User
      </button>
      <ul className="list-group">
        {users?.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-3"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger "
                onClick={() => userDelete(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
