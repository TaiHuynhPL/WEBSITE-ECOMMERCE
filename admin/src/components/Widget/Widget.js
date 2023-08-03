import React from "react";
import classes from "./Widget.module.css";

const Widget = ({ type, quantity }) => {
  let data;

  switch (type) {
    case "client":
      data = {
        title: "Clients",
        isMoney: false,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={classes.icon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
        ),
      };
      break;
    case "earning":
      data = {
        title: "Earnings of Month",
        isMoney: true,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={classes.icon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      };
      break;
    case "order":
      data = {
        title: "New Order",
        isMoney: false,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={classes.icon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        ),
      };
      break;
    default:
      break;
  }

  const convertPrice = (price) => {
    const newprice = new Intl.NumberFormat("vi-VN").format(price);
    return newprice;
  };

  return (
    <div className={classes.widget}>
      <div className={classes.left}>
        <span className={classes.counter}>
          {data.isMoney ? convertPrice(quantity) : quantity}{" "}
          {data.isMoney && <span className={classes.vnd}>VND</span>}
        </span>
        <span className={classes.title}>{data.title}</span>
      </div>
      <div className={classes.right}>{data.icon}</div>
    </div>
  );
};

export default Widget;
