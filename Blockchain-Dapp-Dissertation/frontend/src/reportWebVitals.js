//this file is react boilerplate and it hleps to measure and report web perfromance:

/* Cumulative Layout Shift (CLS): Measures visual stability.
- First Input Delay (FID): Measures interactivity.
- First Contentful Paint (FCP): Measures loading performance.
- Largest Contentful Paint (LCP): Measures loading performance for large elements.
- Time to First Byte (TTFB): Measures server response time. */

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
