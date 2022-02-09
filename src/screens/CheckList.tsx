import React from "react";

const data: { task: string; isDone: boolean }[] = [
  {
    task: "auto play youtube video on click",
    isDone: false,
  },
  {
    task: "categorize notes",
    isDone: false,
  },
  {
    task: "share notes",
    isDone: false,
  },
  { task: "delete note", isDone: false },
  {
    task: "at created at time for note",
    isDone: false,
  },
  { task: "updated time for note also", isDone: false },
  { task: "mvp", isDone: true },
];

function CheckList() {
  return (
    <div className="CheckList">
      {data.map((taskItem) => (
        <div className="flex items-center">
          <div
            className={
              "w-4 h-4 rounded-md mr-2 " +
              (taskItem.isDone ? "bg-green-400" : "bg-red-400")
            }
          ></div>
          <p>{taskItem.task}</p>
        </div>
      ))}
    </div>
  );
}

export default CheckList;
