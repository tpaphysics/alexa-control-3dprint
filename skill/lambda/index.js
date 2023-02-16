/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require("ask-sdk-core");
const mqtt = require("mqtt");
const env = require("dotenv").config();

const options = {
  username: `${process.env.MQTT_USER}`,
  password: `${process.env.MQTT_PASSWORD}`,
  rejectUnauthorized: false,
};

const send = (topic, message) => {
  const client = mqtt.connect(`${process.env.MQTT_URL}`, options);
  client.subscribe("ender3/#");
  client.publish(`${topic}`, JSON.stringify(message));
  client.end();
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const speakOutput = `<audio src="soundbank://soundlibrary/computers/printers/printers_13"/> O que deseja ?`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const MoveAxisPositiveIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "MoveAxisPositiveIntent"
    );
  },
  handle(handlerInput) {
    const axis =
      handlerInput.requestEnvelope.request.intent.slots.axis.value;
    const distance =
      handlerInput.requestEnvelope.request.intent.slots.distance.value;
      
      let speakOutput;
      if( (axis === "X" || axis === "Y" || axis === "Z") && ( distance >= 0 && distance <= 5)  ){
          speakOutput = `Movendo eixo ${axis} ${distance} cm!`;
          send("ender3/moveAxis", { axis,distance });
      }else {
          speakOutput = 
            `<speak>
                <say-as interpret-as="interjection">oxênte</say-as>!
            </speak>`
      }
   
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Algo mais?")
      .getResponse();
  },
};

const MoveAxisNegativeIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "MoveAxisNegativeIntent"
    );
  },
  handle(handlerInput) {
    const axis =
      handlerInput.requestEnvelope.request.intent.slots.axis.value;
    const distance =
      handlerInput.requestEnvelope.request.intent.slots.distance.value;
      
      let speakOutput;
      if( (axis === "X" || axis === "Y" || axis === "Z") && ( distance >= 1 && distance <= 5)  ){
          speakOutput = `Movendo eixo ${axis} menos ${distance} cm`;
          send("ender3/moveAxis", { axis, distance:-distance });
      }else {
          speakOutput = 
            `<speak>
                <say-as interpret-as="interjection">oxênte</say-as>!
            </speak>`
      }
   
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Algo mais?")
      .getResponse();
  },
};

const HotBedIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "HotBedIntent"
    );
  },
  handle(handlerInput) {
    const temperature =
      handlerInput.requestEnvelope.request.intent.slots.temperature.value;

    const speakOutput = `Hot bed, aquecendo a ${temperature} graus!`;
    send("ender3/hotBed", { temperature });
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Algo mais?")
      .getResponse();
  },
};

const HotEndIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "HotEndIntent"
    );
  },
  handle(handlerInput) {
    const temperature =
      handlerInput.requestEnvelope.request.intent.slots.temperature.value;

    const speakOutput = `Hot end, aquecendo a ${temperature} graus!`;
    send("ender3/hotEnd", { temperature });
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Algo mais?")
      .getResponse();
  },
};

const StatusIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "StatusIntent"
    );
  },
  handle(handlerInput) {
    send("ender3/status", { cmd: "info status" });

    return (
      handlerInput.responseBuilder
        //.speak(speakOutput)
        //.reprompt('')
        .getResponse()
    );
  },
};

const CoolDownIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "CoolDownIntent"
    );
  },
  handle(handlerInput) {
    send("ender3/CoolDown", { cmd: "CoolDown" });
    const speakOutput = "Esfriando impressora 3d!"
    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

const AutoHomeIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AutoHomeIntent"
    );
  },
  handle(handlerInput) {
    send("ender3/home", { home: "ok" });
    const speakOutput = `Fazendo auto home!`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

const HomeAxisIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'HomeAxisIntent'
    );
  },
  handle(handlerInput) {
      
    const axis = handlerInput.requestEnvelope.request.intent.slots.axis.value;  
    send("ender3/homeAxis", { axis });
    const speakOutput = `Fazendo home do eixo ${axis}!`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "You can say hello to me! How can I help?";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speakOutput = "Ok!";

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "Sorry, I don't know about that. Please try again.";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs
 * */
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      "SessionEndedRequest"
    );
  },
  handle(handlerInput) {
    console.log(
      `~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`
    );
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
  },
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents
 * by defining them above, then also adding them to the request handler chain below
 * */
const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
    );
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput =
      "Sorry, I had trouble doing what you asked. Please try again.";
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    MoveAxisPositiveIntentHandler,
    MoveAxisNegativeIntentHandler,
    HomeAxisIntentHandler,
    StatusIntentHandler,
    HotBedIntentHandler,
    HotEndIntentHandler,
    CoolDownIntentHandler,
    AutoHomeIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent("sample/hello-world/v1.2")
  .lambda();
