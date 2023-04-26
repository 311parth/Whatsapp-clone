import React, { useState, useEffect, useRef } from "react";
import ChatList from "./ChatList";
import { useDispatch, useSelector } from "react-redux";

function LeftSideSection() {
    const [searchInput, setSearchInput] = useState(""); // state to store search input
    const contactsSlice = useSelector((state) => state.contactsSlice.contacts);
    const [dummyState, setDummyState] = useState(false); // A dummy state used to trigger a re-render

    const filteredContacts = searchInput
        ? contactsSlice.filter((contact) =>
            contact.username.toLowerCase().includes(searchInput.toLowerCase())
        )
        : contactsSlice;

    useEffect(() => {
        setDummyState((prevState) => !prevState);
    }, [contactsSlice, searchInput]);

    function searchContact(event) {
        setSearchInput(event.target.value);
    }

    return (
        <>
            <div
                id="leftSectionTop"
                className="leftSide py-2   bg-white  items-center  max-h-screen overflow-y-scroll scrollbar "
                style={{
                    height: "89vh",
                }}
            >
                <div className=" container  px-4 flex items-center text-sm h-10  bg-primary-light-gray rounded-3xl ">
                    <i
                        style={{ fontSize: "1.2rem" }}
                        className=" material-icons ml-4 stroke-primary-light-gray  text-primary-dark-gray"
                    >
                        search
                    </i>
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Search"
                        value={searchInput}
                        onChange={searchContact}
                        className=" bg-primary-light-gray w-10/12 h-8  rounded-xl px-5 py-2 text-gray-500 focus:outline-none "
                    />
                </div>
                <div className="chatListContainer mt-2 w-full border-t-2 border-gray-3=200 ">
                    {filteredContacts.map((ele, index) => (
                        <ChatList
                            key={ele.username}
                            ChatListUsername={ele.username}
                            ChatListId={index}
                            saved={ele.saved}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default LeftSideSection;
