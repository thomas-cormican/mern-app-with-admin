import React from "react";

import "./Input.css";

export default function Input(props) {
  return (
    <div>
      <input
        className="form_input"
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {props.errorsList &&
        props.errorsList.map((error) => <p>{error.msg || error.message}</p>)}
    </div>
  );
}
