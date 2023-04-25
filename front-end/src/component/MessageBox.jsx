import React from "react";

function MessageBox(props) {
  const isLeft = props.isLeft;
  const senderName = props.senderName;
  const msgBody = props.msgBody;
  var time = props.time;

  var date = new Date(time);
  var timeString = `${date.getHours()} : ${ date.getMinutes() }  `  ;

  const chatBubbleStyles = `max-w-3/4 w-fit py-2 px-4 rounded-2xl border border-gray-300 ${
    isLeft ? "bg-white" : "bg-green-200 ml-auto"
  }`;

  const chatBubbleContainerStyles = `flex flex-row ${isLeft ? "items-start" : "items-end"} ${
    isLeft ? "justify-start" : "justify-end"
  }`;

  return (
    <div className={chatBubbleContainerStyles}>
      <div className={chatBubbleStyles}>
        {senderName && (
          <div className="text-gray-500 text-xs mb-1 ">{isLeft ? senderName : "You"}</div>
        )}
        <div className="flex flex-col items-end">
        <span className="text-sm">{msgBody}</span>
        <span className="text-gray-500 text-[0.7rem] text-right">{timeString}</span>

        </div>
      </div>
    </div>
  );
}

export default MessageBox;
