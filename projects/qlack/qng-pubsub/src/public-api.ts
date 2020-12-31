/*
 * Public API Surface of qng-pubsub
 */
export * from './lib/qng-pubsub.service';
export * from './lib/qng-pubsub.module';
export * from './lib/qng-pubsub.tokens';


/**
 * the QPubSub property is added to the JavaScript
 * Window interface by taking advantage of TS declaration merging
 */
declare global {
  interface Window {
    QPubSub?: any;
  }
}

