import {NgModule} from '@angular/core';
import {lodash, QPUBSUBLIB, WINDOW} from './qng-pubsub.tokens';
import {QPubSub} from '@qlack/qpubsub';

/**
 * Factory function. Deletes the QPubSub object from `window`
 * so that it is not globally accessible and returns the reference
 * to an Injection token which then can be injected in any component,
 * service etc of our app.
 * @param window The browser window object
 */
export function encapsulateQPubSub(window: Window) {
  const qPubSub: QPubSub = window.QPubSub;

  // Delete QPubSub object from window so it's not globally accessible.
  if (qPubSub) {
    try {
      delete window.QPubSub;
      console.log('QPubSub deleted from window object.');
    } catch (e) {
      window.QPubSub = undefined;
      console.log('QPubSub undefined from window object.');
    }
  }
  return qPubSub;
}

@NgModule({
  declarations: [],
  imports: [],
  providers: [{
    provide: QPUBSUBLIB,
    useFactory: encapsulateQPubSub,
    deps: [WINDOW, lodash]
  }],
  exports: []
})
export class QNgPubSubModule {
}

