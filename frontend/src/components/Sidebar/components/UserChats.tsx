import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useGetUserChatsQuery } from "../../../services/chat.service";

function UserChats() {
  const user = useSelector((state: RootState) => state.user);
  const { data, isLoading, error, isError } = useGetUserChatsQuery(user._id);

  if (isLoading) return <div>Loading chats</div>;
  else if (isError)
    return (
      <div>
        Error: <>{error}</>
      </div>
    );

  console.log(data);

  return (
    <>
      {data?.map((chat) => (
        <li key={chat._id}>{chat._id}</li>
      ))}
    </>
  );
}

export default UserChats;
