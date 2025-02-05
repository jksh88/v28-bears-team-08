import { Subject } from "rxjs";

import { IController } from "../Core";

import { BrokerMessage, Message } from "./";
import { Broker } from "./Broker";

export class ModuleBroker implements Broker {
  private static instance: ModuleBroker;
  private moduleSubject: Subject<Message>;
  private controllerSubject: Subject<Message>;
  private controller: IController;

  private constructor(core: IController) {
    this.moduleSubject = new Subject<Message>();
    this.controllerSubject = new Subject<Message>();
    this.controller = core;
    this.moduleSubject.subscribe(core);
  }

  static init(core: IController): ModuleBroker {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ModuleBroker(core);
      return this.instance;
    }
  }

  publish(msg: BrokerMessage) {}

  subscribe() {}
}
