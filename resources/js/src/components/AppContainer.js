import React from "react";

const AppContainer = ({title, children}) => {

    return (
        <div className="AppContainer__container">
            <div className="container mt-2">
                <div className="card">
                    <div className="card-header">
                        {title}
                    </div>
                    <div className="card-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppContainer;
