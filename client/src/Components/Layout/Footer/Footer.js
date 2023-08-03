import classes from "./Footer.module.css";

const DummyLink = [
  {
    id: 1,
    title: "CUSTOMER SERVICES",
    content: [
      "Help & Contact Us",
      "Return & Refunds",
      "Online Stores",
      "Terms & Conditions",
    ],
  },
  {
    id: 2,
    title: "COMPANY",
    content: ["What We Do", "Available Services", "Latest Posts", "FAQs"],
  },
  {
    id: 3,
    title: "SOCIAL MEDIA",
    content: ["Twitter", "Instagram", "Facebook", "Pinterest"],
  },
];

//Component footer của layout
function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.footerContainer}>
        {DummyLink.map((data) => (
          <div key={data.id} className={classes.list}>
            <h3 className={classes.title}>{data.title}</h3>
            <ul className={classes.listitem}>
              {data.content.map((item) => (
                <li key={item} className={classes.item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Footer;
