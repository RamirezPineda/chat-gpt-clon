import { ChangeEvent, FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { RiSendPlaneFill } from "react-icons/ri";
import { socket } from "../../config/socket";
import { useGetAllChatsQuery } from "../../services/chat.service";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function Chat() {
  const user = useSelector((state: RootState) => state.user);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [partialResponse, setPartialResponse] = useState<string>("");
  const [chatId, setChatId] = useState<string | undefined>(undefined);
  const [responseText, setResponseText] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // socket.emit("hello from client", 5, "6", { user: "roy" });
    // socket.disconnect();
    try {
      socket.on("partialResponse", (...args) => {
        setPartialResponse(args[0]);
      });

      const response = await fetch("http://127.0.0.1:4000/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          userId: user._id,
          _id: chatId,
        }),
      });
      const data = await response.json();
      console.log(data);
      console.log(chatId)
      setChatId(data._id);
      setResponseText(data.responseText);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" text-gray-300  ">
      <div className="flex items-center justify-center w-full relative">
        <form onSubmit={handleSubmit}>
          {partialResponse != "" ? (
            <div className="bg-zinc-700 rounded border border-neutral-500 w-full px-4 py-2 mx-3 mb-8 ">
              <ReactMarkdown
                className="prose max-w-none prose-p:text-gray-300 prose-a:text-gray-300 prose-li:text-gray-300 prose-ol:text-gray-300 prose-strong:text-white prose-em:text-white prose-headings:text-white prose-code:text-white prose-tr:text-gray-300"
                children={partialResponse}
                remarkPlugins={[remarkGfm]}
              />
            </div>
          ) : undefined}
          <div className="flex">
            <input
              onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                setMessage(target.value)
              }
              type="text"
              name="message"
              id="message"
              className="outline-none rounded-l-lg bg-[#1E1F25] border border-neutral-700 block ml-6 flex-1 w-full p-2.5"
            />
            <span className="inline-flex items-center px-3 bg-[#1E1F25] border border-neutral-700 rounded-r-md hover:bg-neutral-700">
              <button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className=" inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.130em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                ) : (
                  <RiSendPlaneFill />
                )}
              </button>
            </span>
          </div>

          {/* <textarea
            className="bg-[#1E1F25] rounded border border-neutral-700 px-4 py-2 mx-3 w-3/4"
            required={true}
          >
            
          </textarea> */}
        </form>
      </div>
    </div>
  );
}

export default Chat;
