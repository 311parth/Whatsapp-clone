import React from 'react'
function PopUpBox(props) {
    
    return (
        <>
            <div id="newContactModal" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
                <div className="relative w-full h-full max-w-2xl md:h-auto">
                    <div className="relative bg-white rounded-lg shadow ">
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {props.header}
                            </h3>
                            <button type="button" id="modalClose" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal"
                                onClick={() => {
                                    document.getElementById("newContactModal").classList.add("hidden");
                                }}
                            >
                                <span className="material-icons">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            {props.content}
                        </div>
                        {props.isModalSubmitBtn ?
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button type="button" className="text-black  border-2 hover:bg-primary-green focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center">{props.submitButtonText}</button>
                            </div> : ""}
                    </div>
                </div>
            </div>

        </>
    )
}

export default PopUpBox
