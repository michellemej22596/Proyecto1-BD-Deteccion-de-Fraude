const Footer = () => {
    return (
      <footer className="bg-lime-300 text-violet-400 lg:px-10 px-4 py-3 w-full mt-auto"> {/* Remover m-[1cm] y asegurarse que ocupe todo el ancho */}
        <div className="container mx-auto grid grid-cols-1 lg:flex lg:justify-between">
          <div className="mb-4 md:mb-0 flex items-center">
            <div>
              <h2 className="text-[22px] font-semibold text-white py-2 uppercase">CONTACT</h2>
              <p className="text-[12px] my-1"></p>
            </div>
          </div>
        </div>
  
        <div className="text-white text-center lg:text-center">
          <span>© 2024 Equipo Alfa Buena Maravilla. All rights reserved.</span>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  