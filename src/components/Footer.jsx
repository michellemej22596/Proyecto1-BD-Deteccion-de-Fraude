const Footer = () => {
    return (
        <footer>
            <div className="container mx-auto grid grid-cols-1 lg:flex lg:justify-between">
                <div className="mb-4 md:mb-0 flex items-center">
                    <img src="src/assets/Icono.png" alt="Logo" className="w-8 h-8 lg:w-6 lg:h-6 mr-4"/>
                    <div>
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
