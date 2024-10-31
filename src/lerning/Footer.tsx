const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear} HabitTracker</p>
    </footer>
  );
};

export default Footer;
