import './infoToolTip.css';

const InfoTooltip = ({ text, isOpen, onClose }) => {
    return (
        <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <p className="popup__text">{text}</p>
                <button className="popup__button-close" type="button" onClick={onClose} />
            </div>
        </section>
    );
};

export default InfoTooltip;