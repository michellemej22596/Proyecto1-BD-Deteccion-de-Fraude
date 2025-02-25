const Footer = () => {
    return (
        <footer className="bg-stone-900 text-violet-400 lg:px-10 px-4 py-3">
            <div className="container mx-auto grid grid-cols-1 lg:flex lg:justify-between">
                <div className="mb-4 md:mb-0 flex items-center">
                    <img src="src/assets/Icono.png" alt="Logo" className="w-1/6 h-auto lg:w-1/12 mr-4"/>
                </div>
            </div>

            <div className="text-white text-center lg:text-center">
                <span>© 2024 Equipo Alfa Buena Maravilla. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;