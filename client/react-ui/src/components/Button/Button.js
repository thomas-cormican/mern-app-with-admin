import React from "react";

import "./Button.css";

export default function Button(props) {
  if (!props.size && !props.style) {
    return (
      <button type={props.type} className={`button medium primary`}>
        {props.children}
      </button>
    );
  }
  if (!props.size) {
    return (
      <button type={props.type} className={`button medium ${props.style}`}>
        {props.children}
      </button>
    );
  }
  if (!props.style) {
    return (
      <button type={props.type} className={`button ${props.size} primary`}>
        {props.children}
      </button>
    );
  }
  return (
    <button type={props.type} className={`button ${props.size} ${props.style}`}>
      {props.children}
    </button>
  );
}
