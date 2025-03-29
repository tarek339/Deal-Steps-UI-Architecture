const Footer = () => {
  return (
    <div className="w-full bg-foreground p-5">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center text-muted-foreground">
          &copy; 2025 Deal Steps
        </div>
        <div className="text-center text-muted-foreground">
          Made with ❤️ by{" "}
          <a
            href="https://github.com/tarek339?tab=repositories"
            className="text-primary"
          >
            Tarek Jassine
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
