import React, { useState } from 'react';
import './LoaderBtn.css'

const LoaderBtn = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = async () => {
    setIsLoading(true);
    await props.onClick();
    setIsLoading(false);
  }
  const {text, type, className} = props;
  return (
    <div className={`LoaderBtn flex-initial layout-row layout-wrap layout-align-center-center ${className}`}>
      <button
        type="button"
        className={`ant-btn ant-btn-${type || 'primary'}`}
        onClick={() => { toggleLoading(); }}>
        {isLoading ? (
          <div className="flex-initial positionAbsoluteTopLeft isLoadingDots width100">
            <div id="loadingDots" className="LoadingDots flex-100 layout-row text-center layout-align-center-center">
              <div className="flex-initial layout-row layout-align-center-center loadingDotsContainer">
                <span className="dot"/>
                <span className="dot"/>
                <span className="dot"/>
              </div>
            </div>
          </div>
        ) : <p>{ text }</p> }
      </button>
    </div>
  );
}

export default LoaderBtn
