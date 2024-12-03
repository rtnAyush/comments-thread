import "../globals.css";

export default function loading() {
    return (
        <div className="loader__wrap" role="alertdialog" aria-busy="true" aria-live="polite" aria-label="Loading…">
            <div className="loader" aria-hidden="true">
                <div className="loader__sq"></div>
                <div className="loader__sq"></div>
            </div>
            <h1 className="text-xl text-center">Please wait while trigering Render service, once triggered it will not take time</h1>
        </div>
    )
}
