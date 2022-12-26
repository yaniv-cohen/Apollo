"use strict";
// import { KafkaPubSub } from "graphql-kafkajs-subscriptions";
// import { bufferTime, identity, Subject, tap } from "rxjs";
// import { Kafka } from "kafkajs";
// import { extractPayload } from "./pubsubInstance";
// const MY_TOPIC = "myTopic";
// class KafkaHandlerService {
//   public pubSub: KafkaPubSub | undefined;
//   private subscription: any;
//   private subject: Subject<any> = new Subject();
//   private bufferTimeInMs: number = 1000;
//   constructor() {}
//   public async init() {
//     let ssl: any = false;
//     this.pubSub = await KafkaPubSub.create({
//       topic: MY_TOPIC,
//       kafka: new Kafka({
//         brokers: [`http://localhost:9092`],
//       }),
//       groupIdPrefix: "something",
//     });
//     this.subject = new Subject<any>();
//     this.subject
//       .pipe(
//         this.bufferTimeInMs === 0 ? identity : bufferTime(this.bufferTimeInMs),
//         tap(async (payloads: any) => {
//           if (!Array.isArray(payloads)) {
//             payloads = [payloads];
//           }
//           if (!payloads.length) {
//             return;
//           }
//           console.log("payloads", JSON.stringify(payloads));
//         })
//       )
//       .subscribe();
//     this.subscription = await this.pubSub.subscribe(
//       MY_TOPIC,
//       this.onMessage.bind(this)
//     );
//   }
//   private async onMessage(message: any) {
//     const payload = extractPayload(message);
//     console.log("Incoming Kafka Message ", payload);
//     this.subject.next({ payload });
//   }
// }
// export default new KafkaHandlerService();
