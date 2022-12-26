import { Kafka } from "kafkajs";
import { KafkaPubSub } from "graphql-kafkajs-subscriptions";
import { bufferTime, identity, Subject, tap } from "rxjs";
const extractPayload = (kafkaMessage: any) => {
  if (!Buffer.isBuffer(kafkaMessage.value)) {
    return kafkaMessage;
  }
  return JSON.parse(kafkaMessage.value.toString("utf-8"));
};
class KafkaHandlerService {
  public pubSub: KafkaPubSub | undefined;
  private subscription: any;
  private subject: Subject<any> | undefined;

  constructor() {}

  public async init() {
    let ssl: any = false;
    this.pubSub = await KafkaPubSub.create({
      topic: "someTopic",
      kafka: new Kafka({
        brokers: [`localhost:8799`],
        ssl,
      }),
      groupIdPrefix: "groupIdPrefix",
      consumerConfig: {
        maxBytesPerPartition: 5000000,
        maxBytes: 5000000,
        heartbeatInterval: 1000,
        sessionTimeout: 100000,
      },
    });
    this.subject = new Subject<any>();
    this.subject
      .pipe(
        tap(async (payloads: any) => {
          if (!Array.isArray(payloads)) {
            payloads = [payloads];
          }
          if (!payloads.length) {
            return;
          }
          console.log("payloads", JSON.stringify(payloads));
        })
      )
      .subscribe();
    this.subscription = await this.pubSub.subscribe(
      "someTopic",
      this.onMessage.bind(this)
    );
  }

  private async onMessage(message: any) {
    const payload = extractPayload(message);
    console.log("Incoming Kafka Message ", payload);
    this.subject?.next({ payload });
  }
}

export default new KafkaHandlerService();
