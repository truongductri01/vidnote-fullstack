import React from "react";

function RadioButtons(props: {
  label: string;
  onChange: Function;
  values: string[];
  selectedValue: string;
}) {
  return (
    <div className="RadioButton">
      <p>{props.label}</p>
      {props.values.map((value: string) => (
        <div key={value} className="flex items-center ml-3 mb-2">
          <div
            className="w-6 h-6 rounded-full box-border border-2 border-violet-500 cursor-pointer mr-2 flex items-center justify-center"
            onClick={() => props.onChange(value)}
          >
            {props.selectedValue === value && (
              <div className="w-4 h-4 rounded-full bg-violet-800"></div>
            )}
          </div>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
}

export default RadioButtons;
