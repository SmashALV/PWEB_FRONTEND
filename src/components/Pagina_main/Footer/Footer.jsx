import '../Footer/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div>
        <h4>Síguenos</h4>
        <img className='small' src="/img/fb_icon_white.svg" alt="Facebook" />
        <img className='small' src="/img/x_icon_white.svg" alt="X" />
        <img className='small' src="/img/ig_icon_white.svg" alt="Instagram" />
        <img className='small' src="/img/yt_icon_white.svg" alt="YouTube" />
      </div>
      <div>
        <h4>Nosotros</h4>
        <p><a href="conocenos">Conócenos</a></p>
        <p>Responsabilidad social</p>
        <p>Nuestros tiendas</p>
      </div>
      <div>
        <h4>Atención al cliente</h4>
        <p><a href="atencioncliente">Atención al cliente</a></p>
        <p>Horarios de atención</p>
        <p>Preguntas frecuentes</p>
      </div>
      <div>
        <h4>Políticas y condiciones</h4>
        <p><a href="datospersonales">Políticas de datos personales</a></p>
        <p>Condicion de promociones</p>
        <p>Términos y condiciones</p>
      </div>
    </footer>
  );
};

export default Footer;
