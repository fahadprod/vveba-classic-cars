
const Navbar = () => {
  return (
    <>
      <div className="menu target center">
        <div className="menu-line menu-line-1"></div>
        <div className="menu-line menu-line-2"></div>
      </div>

      <nav className="navbar target">
        <a href="#home" className="navbar-link">Home</a>
        <a href="#popular-cars" className="navbar-link">Popular Cars</a>
        <a href="#video-gallery" className="navbar-link">Video Gallery</a>
        <a href="#image-gallery" className="navbar-link">Image Gallery</a>
        <a href="#contact" className="navbar-link">Contact</a>
      </nav>
    </>
  );
};

export default Navbar;