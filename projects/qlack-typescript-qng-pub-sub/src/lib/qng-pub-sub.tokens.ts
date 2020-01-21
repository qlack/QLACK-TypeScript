import {InjectionToken} from '@angular/core';
import {QPubSub} from '@qlack/qpubsub';
import _ from 'lodash';

export const WINDOW = new InjectionToken<Window>(
  'WindowToken',
  typeof window !== 'undefined' && window.document ? {providedIn: 'root', factory: () => window} : undefined
);

export const lodash = new InjectionToken<_>(
  'Lodash',
  {providedIn: 'root', factory: () => _}
);

export const QPUBSUBLIB = new InjectionToken<QPubSub>('QPUBSUBLIB');

