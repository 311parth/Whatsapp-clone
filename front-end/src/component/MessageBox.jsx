import React,{useEffect} from 'react'

function MessageBox(props) {

    return (
        <>
            <div id={"MessageBox-"+props.msgId} className={`MessageBox container p-1 my-2 mx-4 t text-sm w-fit h-fit max-w-xl  border-2 border-primary-dark-gray rounded-lg  bg-opacity-80
            ${props.isLeft ? "bg-primary-light-gray float-left" : "  bg-sec-light-green float-right"} `}
            >
                <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi enim ad eligendi vitae, incidunt dignissimos, tenetur mollitia totam ea cupiditate optio vero maxime quod! Eos non illo porro perspiciatis quae!</span>
            </div>


        </>
    )
}

export default MessageBox
