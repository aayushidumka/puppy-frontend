import "../App.css";

// Footer Component
const Footer = () => {
  return (
    <footer sx={{ backgroundColor: "darkgray" }}>
      <p>&copy; {new Date().getFullYear()} Center for Puppy Management. All rights reserved.</p>
    </footer>
  );
};

export default Footer;