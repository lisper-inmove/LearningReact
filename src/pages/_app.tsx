import React from 'react';
import App from 'next/app';


// 只能在 _app.tsx中出现
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Component {...pageProps} count="123"/>
      </div>
    );
  }
}

export default MyApp;
