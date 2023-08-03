import classes from "./OtherInfomation.module.css";

//Component thông tin khác của trang chủ
function OtherInfomation() {
  return (
    <div className={classes.otherinfoContainer}>
      <div className={classes.infoContainer}>
        <div className={classes.infoItem}>
          <h6>FREE SHIPPING</h6>
          <p>Free shipping worlwide</p>
        </div>
        <div className={classes.infoItem}>
          <h6>24 X 7 SERVICE</h6>
          <p>Free shipping worlwide</p>
        </div>
        <div className={classes.infoItem}>
          <h6>FESTIVAL OFFER</h6>
          <p>Free shipping worlwide</p>
        </div>
      </div>
      <div className={classes.otherInputContainer}>
        <div className={classes.otherContent}>
          <p className={classes.title}>LET'S BE FRIENDS!</p>
          <p className={classes.content}>
            Nisi nisi tempor consequat laboris nisi.
          </p>
        </div>
        <div className={classes.inputContainer}>
          <input type="email" placeholder="Enter your email address" />
          <div className={classes.btn}>Subscribe</div>
        </div>
      </div>
    </div>
  );
}

export default OtherInfomation;
