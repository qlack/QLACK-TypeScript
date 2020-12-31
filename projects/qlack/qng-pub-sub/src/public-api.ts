/*
 * Public API Surface of qng-pub-sub
 */
export * from './lib/qng-pub-sub.service';
export * from './lib/qng-pub-sub.module';
export * from './lib/qng-pub-sub.tokens';


/**
 * the QPubSub property is added to the JavaScript
 * Window interface by taking advantage of TS declaration merging
 */
declare global {
  interface Window {
    QPubSub?: any;
  }
}

