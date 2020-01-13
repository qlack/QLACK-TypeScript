import {Inject, Injectable} from '@angular/core';
import {QPUBSUBLIB} from './qng-pub-sub.tokens';
import {QPubSub} from '@qlack/qpubsub';

/**
 * Angular Service wrapper for QPubSub - a cross-frame, cross-domain pub/sub library based on
 * Window.postMessage().
 */
@Injectable({
  providedIn: 'root'
})
export class QNgPubSubService {

  constructor(@Inject(QPUBSUBLIB) private qPubSub: QPubSub) {
  }

  /**
   * Initialises this instance of QPubSub.
   * @param instanceId The instance ID/name.
   * @param server A boolean, indicating whether this instance is a servrer.
   * @param allowedOrigins A string array of allowed domains to receive messages from.
   */
  public init(instanceId: string, server: boolean, allowedOrigins?: string[]): void {
    this.qPubSub.init(instanceId, server, allowedOrigins);
  }

  /**
   * Publishes a message on a topic.
   * @param topic The name of the topic to publish to.
   * @param msg The message to be published.
   */
  public publish(topic: string, msg: string): void {
    this.qPubSub.publish(topic, msg);
  }

  /**
   * Activate / Deactivate logging
   * @param bool Flag for loggign activation / deactivation
   */
  public setLogActive(bool: boolean): void {
    this.qPubSub.setLogActive(bool);
  }

  /**
   * Subscribes to a topic to receive messages.
   * @param topic The name of the topic to subscribe to.
   * @param callback A function to receive the contents of the message.
   */
  public subscribe(topic: string, callback: (msg: QPubSub.Message) => void): void {
    this.qPubSub.subscribe(topic, callback);
  }

  /**
   * Unsubscribe from a previously subscribed topic.
   * @param topic The name of the topic to unsubscribe from.
   */
  public unsubscribe(topic: string): void {
    this.qPubSub.unsubscribe(topic);
  }

}
