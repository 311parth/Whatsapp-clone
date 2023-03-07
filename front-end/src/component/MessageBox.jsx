import React,{useEffect} from 'react'

function MessageBox(props) {

    return (
        <>
            <div className="my-0.5 mx-2">
                <div id={"MessageBox-"+props.msgId} className={`MessageBox p-1    w-fit max-w-xl  text-sm  h-fit   border-primary-dark-gray rounded-md  bg-opacity-80
                ${props.isLeft ? "bg-primary-light-gray " : "  bg-sec-light-green ml-auto mr-0"} `}
                style={{
                    maxWidth:"85%",
                    minWidth:"1.5rem",
                    borderWidth:"0.5px",
                }}
                >
                    <span className="w-fit ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eos!
                    </span>
                </div>
            </div>


        </>
    )
}

export default MessageBox
