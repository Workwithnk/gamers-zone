import React from "react";

const footerCss = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ecf0f1",
  padding: "4px 0px",
  position: "fixed",
  bottom: "0px",
  width: "100%",
  color: "#2ecc71",
  boxShadow: "0px -1px 1px 0px #bdc3c7",
  fontWeight: "bolder",
  letterSpacing: "3px",
};

function Footer() {
  return (
    <div style={footerCss} className="footer">
      Powerd by Gamer's Zone
    </div>
  );
}

export default Footer;
