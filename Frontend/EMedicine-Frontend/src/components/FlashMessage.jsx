export default function FlashMessage({ message, type = "success", onClose }) {
    if (!message) return null;

    return (
        <div className="position-fixed top-0 py-5 mt-3 start-50 translate-middle-x" style={{ zIndex: 1, maxWidth: '550px', width: '90%' }}>
            <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
                {message}
                <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
        </div>
    );
}