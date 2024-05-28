export class SmtpGreetingDelivery {
    constructor(transport) {
      this.transport = transport;
    }
  
    messageDelivery(message) {
      this.transport.sendMail(message);
    }
  }