import React from 'react';
import './style.scss';
// import {Toast} from 'antd-mobile';

const loadingComponent = ({isLoading, error}) => {
  // Handle the loading state
  if (isLoading) {
    // Toast.loading('Loading...', 1, () => {
    // });
    return (
      <div className="loading">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }
  // Handle the error state
  if (error) {
    return <div>{error}</div>;
  }

  // Toast.hide()
  return null;
};
export {loadingComponent};
export default loadingComponent;
