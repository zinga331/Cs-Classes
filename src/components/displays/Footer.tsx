import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer_ul">
        <li className="footer_li">
          <h2 className="byu_footer">NOT BRIGHAM YOUNG UNIVERSITY</h2>
        </li>
        <li className="footer_li">
          <h2 className="byu_location">
            Provo, UT 84602, USA | 801-422-4636 | 2024 What Rights?
          </h2>
        </li>
        <li className="footer_li">
          <h2 className="disclaimer">Catalog Webpage Prototype For CS 356</h2>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
