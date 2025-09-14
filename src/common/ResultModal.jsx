
import '../css/modal.css';

function ResultModal({ title, content, callbackFunc }) {

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">{title}</h2>
                <p className="modal-body">{content}</p>
                <button className="modal-close" onClick={() => {
                    if (callbackFunc) {
                        callbackFunc();
                    }
                } }> 닫기 </button>                
            </div>
        </div>
    );


}



export default ResultModal;