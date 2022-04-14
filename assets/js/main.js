import {
  Application,
  Controller,
} from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";
import "https://unpkg.com/@hotwired/turbo@7.1.0/dist/turbo.es2017-esm.js";

const application = Application.start();

application.register(
  "email",
  class extends Controller {
    static values = {
      mailbox: String,
      domain: String,
    };

    connect() {
      this.element.innerText = `${this.mailboxValue}@${this.domainValue}`;
      this.element.href = `mailto:${this.mailboxValue}@${this.domainValue}`;
    }
  }
);

application.register(
  "fish",
  class extends Controller {
    static targets = ["fish", "mayhem"];

    hover() {
      this.fishTarget.style.display = "block";
      this.mayhemTarget.style.display = "none";
    }

    unhover() {
      this.fishTarget.style.display = "none";
      this.mayhemTarget.style.display = "block";
    }
  }
);
