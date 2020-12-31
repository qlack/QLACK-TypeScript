# @qlack/qng-pubsub
`Angular support: 11.0.4`

Npm package of an Angular wrapper for [@qlack/qpubsub](https://www.npmjs.com/package/@qlack/qpubsub)

## Installing
`npm install --save @qlack/qng-pubsub`

## Usage

### Provide the browser window to your module
```typescript
providers: [
  {provide: Window, useValue: window}
],
```
### Import the QNgPubSubModule

```typescript
  import {QNgPubSubModule} from '@qlack/qng-pubsub';
```
```typescript
  imports: [
    QNgPubSubModule
  ],
```
### Import the QNgPubSubService in your component

```typescript
  import {QNgPubSubService} from '@qlack/qng-pubsub';
```
```typescript
constructor(private qPubSubService: QNgPubSubService) {
  //use the qPubSubService
}
```

### Starting the server
```typescript
qPubSubService.init('server', true, ["http://localhost:8080", "https://myprod-url", "https://mypreprod-url"]);
```
* The first argument is the name of this instance. This name does not have any practical
implication other than helping you identifying the source of log messages.
* The second argument is a boolean value indicating whether this instance of
QPubSub is a server instance; you need to set it as 'true'.
* The third argument [optional] is an array of strings containing the allowed origin domains to
 receive messages from.

### Starting a client
```typescript
qPubSubService.init("client1", false);
```

* Similarly to the server instantiation, but indicating that this is a client
instance with the 'false' argument.

During client initialisation, QPubSub will traverse the DOM and try to identify
a listening QPubSub server. Once the server is identified, a ping-pong style of
message exchange will take place to allow the client to register with the server.
You need to ensure that when initialisation of the client takes place the server
component is already loaded and initialised.

### Security
To guarantee that only allowed domains can communicate with your QPubSub server,
you may provide an allowed domains list while initialising QPubSub. The domain
 list is a string array, so multiple domains can be specified at once, e.g. 
```typescript
qPubSubService.init("server", true, ["http://localhost:8080", "https://myprod-url", "https://mypreprod-url"]);
```

### API
#### `init(instaceID: string, server: boolean, allowedOrigins?: string[]): void`
Initialises the QPubSub instance.
* `iID` A String value identifying the name of this instance. Its only purpose
is to identify the source of console logging messages.
* `server` A Boolean value indicating whether this instance is a server. Make
sure you only have one server instance running.
* `allowedOrigins` *[optional]* A String array with the domains from which communication
is allowed. If not specified, you will see a warning in your Javascript
console, however pub/sub will still work. You are strongly advised to never
use QPubSub in production without a list of allowed domains.

#### `subscribe(topic: string, callback: (msg: QPubSub.Message) => void): void`
Subscribe to a topic to receive messages. Each message received is forwarded to
the callback function specified.
* `topic` The name of the topic to subscribe to.
* `callback` A callback function to receive the message.

#### `unsubscribe(topic: string): void`
Unsubscribes from a previously subscribed topic.
* `topic` The name of the topic to unsubscribe from.

#### ` publish(topic: string, msg: string): void`
Publishes a message to a specific topic.
* `topic` The name of the topic where the message will be published.
* `message` The message to be published.

#### `setLogActive(bool: boolean): void`
* `boolean` Whether to set logging as active or not.
