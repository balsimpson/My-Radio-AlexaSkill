"use strict";

const Alexa = require("ask-sdk-core");

const polly = {
  american: ["Ivy", "Joanna", "Joey", "Justin", "Kendra", "Kimberly", "Matthew", "Salli"],
  australian: ["Nicole", "Russell"],
  british: ["Amy", "Brian", "Emma"],
  indian: ["Aditi", "Raveena"],
  german: ["Hans", "Marlene", "Vicki"],
  spanish: ["Conchita", "Enrique"],
  italian: ["Carla", "Giorgio"],
  japanese: ["Mizuki", "Takumi"],
  french: ["Celine", "Lea", "Mathieu"]
}

//change
const languages = ["american", "australian", "british", "indian", "german", "spanish", "italian", "japanese", "french"]

const streams = {
  meditate: {
    name: "Meditation Radio",
    url: [
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=716503", // meditate
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=672521", // candles
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1390835",  // ambient sleeping pill
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1168860"   // relaxation island
    ]
  },
  party: {
    name: "Party Radio",
    url: [
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1762384", // ibiza
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1684591", // disco
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1376488", // hitparty
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1593461",
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1689368",
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1738454"
    ]
  },
  classical: {
    name: "Classical Radio",
    url: [
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=22146",
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1423129"
    ]
  },
  vividh: {
    name: "Vividh Bharathi",
    url: [
      "https://vividhbharati-lh.akamaihd.net/i/vividhbharati_1@507811/index_1_a-p.m3u8"
    ]
  },
  malayalam: {
    name: "Malayalam Radio",
    url: [
      "https://airmalayalam-lh.akamaihd.net/i/airmalayalam_1@507816/master.m3u8"
    ]
  },
  tamil: {
    name: "Tamil Radio",
    url: ["https://airtamil-lh.akamaihd.net/i/airtamil_1@507817/master.m3u8"]
  },
  fmrainbow: {
    name: "FM Rainbow",
    url: ["https://fmrainbow-lh.akamaihd.net/i/fmrainbow_1@507812/master.m3u8"]
  },
  gta: {
    name: "GTA Radio",
    url: [
      "https://s3.amazonaws.com/gtaradio/Bounce+FM.mp3",
      "https://s3.amazonaws.com/gtaradio/VROCK.mp3",
      "https://s3.amazonaws.com/gtaradio/FEVER.mp3",
      "https://s3.amazonaws.com/gtaradio/ESPANT.mp3",
      "https://s3.amazonaws.com/gtaradio/KCHAT.mp3",
      "https://s3.amazonaws.com/gtaradio/Radio+Los+Santos.mp3",
      "https://s3.amazonaws.com/gtaradio/Radio+X.mp3",
      "https://s3.amazonaws.com/gtaradio/SF-UR+(San+Fierro+Underground+Radio).mp3",
      "https://s3.amazonaws.com/gtaradio/West+Coast+Talk+Radio.mp3",
      "https://s3.amazonaws.com/gtaradio/FLASH.mp3",
      "https://s3.amazonaws.com/gtaradio/Blaine+County+Radio.mp3"
    ]
  },
  ghazals: {
    name: "Ghazal Radio",
    url: ["https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1776826"]
  },
  chill: {
    name: "Chillout Radio",
    url: [
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1272062",
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1503892",
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=191920",
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=138301",
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1603960"
    ]
  },
  serbian: {
    name: "Serbian Radio",
    url: [
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1437438"
    ]
  },
  folk: {
    name: "Folk Radio",
    url: [
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=421954", // irish
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1427510", // radio moonlight
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=797220"  // holland
    ]
  },
  jazz: {
    name: "Jazz Radio",
    url: [
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1459011",
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1528122",
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1763350"

    ]
  },
  rock: {
    name: "Rock Radio",
    url: [
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1419250",
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1501022",
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=99210029",
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1317966",
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1761664"
    ]
  },
  blues: {
    name: "Blues Radio",
    url: [
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1570996",
      "https://yp.shoutcast.com/sbin/tunein-station.m3u?id=1721719"
    ]
  }

};

const stations = [
  "meditate",
  "party",
  "classical",
  "vividh",
  "malayalam",
  "tamil",
  "fmrainbow",
  "gta",
  "ghazals",
  "chill",
  "serbian",
  "folk",
  "jazz",
  "rock",
  "blues"
];

const STOP_MSG = [
  "ok",
  "sure",
  "done"
]

let skill;

exports.handler = async function (event, context) {
  console.log(`REQUEST++++${JSON.stringify(event)}`);
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        PlayRadioIntentHandler,
        AudioPlayerEventHandler,
        NextIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        SystemExceptionHandler
      )
      .addErrorHandlers(myErrorHandler)
      .create();
  }

  return skill.invoke(event, context);
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    let stream_data = getRadioStation();
    console.log("stream: " + JSON.stringify(stream_data));
    let voice = setVoice('british');
    const speechText = `<voice name="${voice}">Playing ${stream_data.name} </voice>`;

    console.log("LaunchRequestHandler");

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .addAudioPlayerPlayDirective("REPLACE_ALL", stream_data.url, stream_data.name, 0, null)
      .getResponse();
  }
};

const PlayRadioIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "PlayRadioIntent"
    );
  },
  handle(handlerInput) {
    let intent = handlerInput.requestEnvelope.request.intent;
    let currentSlot = intent.slots.musicStation;
    let slotValue = "";

    if (
      currentSlot.confirmationStatus !== "CONFIRMED" &&
      currentSlot.resolutions &&
      currentSlot.resolutions.resolutionsPerAuthority[0]
    ) {
      if (
        currentSlot.resolutions.resolutionsPerAuthority[0].values.length > 0
      ) {
        slotValue =
          currentSlot.resolutions.resolutionsPerAuthority[0].values[0].value
            .name || "";
        console.log("slotValue: " + slotValue);
      }
    }

    let stream_data = getRadioStation(slotValue);
    console.log("stream: " + JSON.stringify(stream_data.url));
    let voice = setVoice('british');
    const speechText = `<voice name="${voice}">Playing ${stream_data.name} </voice>`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Hello World", speechText)
      .addAudioPlayerPlayDirective("REPLACE_ALL", stream_data.url, stream_data.name, 0, null)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speechText = "You can ask me for a music according to mood or genre!";
    const promptText = "Ask me for chillout or party music.";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(promptText)
      // .withSimpleCard("Hello World", speechText)
      .getResponse();
  }
};

const NextIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.NextIntent"
    );
  },
  handle(handlerInput) {
    let stream_data = getRadioStation();
    let voice = setVoice('british');
    const speechText = `<voice name="${voice}">Playing ${stream_data.name} </voice>`;

    console.log(`NextIntentHandler - ${voice} - ${stream_data.url}`);
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Radio", speechText)
      .addAudioPlayerPlayDirective("REPLACE_ALL", stream_data.url, stream_data.name, 0, null)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      (handlerInput.requestEnvelope.request.intent.name ===
        "AMAZON.CancelIntent" ||
        handlerInput.requestEnvelope.request.intent.name ===
        "AMAZON.StopIntent" ||
        handlerInput.requestEnvelope.request.intent.name ===
        "AMAZON.PauseIntent")
    );
  },
  handle(handlerInput) {

    let voice = setVoice('british');
    const speechText = `<voice name="${voice}">${randomItem(STOP_MSG)} </voice>`;

    console.log("CancelAndStopIntentHandler");

    return (
      handlerInput.responseBuilder
        .speak(speechText)
        .addAudioPlayerStopDirective()
        // .withShouldEndSession(true)
        // .addAudioPlayerPlayDirective("REPLACE_ALL", url, 1000, 0, null)
        .getResponse()
    );
  }
};

const myErrorHandler = {
  canHandle(handlerInput, error) {
    return error.name.startsWith("AskSdk");
  },
  handle(handlerInput, error) {
    console.log("error" + error);
    console.log("handlerInput:" + JSON.stringify(handlerInput));
    return (
      handlerInput.responseBuilder
        .speak('An error was encountered while handling your request. Try again later')
        .getResponse()
    );
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    console.log("SessionEndedRequestHandler");
    return handlerInput.responseBuilder.getResponse();
  }
};

const AudioPlayerEventHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type.startsWith("AudioPlayer.");
  },
  async handle(handlerInput) {
    const {
      requestEnvelope,
      attributesManager,
      responseBuilder
    } = handlerInput;
    const audioPlayerEventName = requestEnvelope.request.type.split(".")[1];
    // const {
    //   playbackSetting,
    //   playbackInfo
    // } = await attributesManager.getPersistentAttributes();

    switch (audioPlayerEventName) {
      case "PlaybackStarted":
        console.log(`PlaybackStarted - ${requestEnvelope.request.token}`);
        // playbackInfo.token = getToken(handlerInput);
        // playbackInfo.index = await getIndex(handlerInput);
        // playbackInfo.inPlaybackSession = true;
        // playbackInfo.hasPreviousPlaybackSession = true;
        break;
      case "PlaybackFinished":
        console.log("PlaybackFinished");
        // playbackInfo.inPlaybackSession = false;
        // playbackInfo.hasPreviousPlaybackSession = false;
        // playbackInfo.nextStreamEnqueued = false;
        break;
      case "PlaybackStopped":
        console.log(`PlaybackStopped - ${requestEnvelope.request.token}`);
        // playbackInfo.token = getToken(handlerInput);
        // playbackInfo.index = await getIndex(handlerInput);
        // playbackInfo.offsetInMilliseconds = getOffsetInMilliseconds(handlerInput);
        break;
      case "PlaybackNearlyFinished": {
        console.log("PlaybackNearlyFinished");
        break;
      }
      case "PlaybackFailed":
        console.log(`PlaybackFailed - ${requestEnvelope.request.token}`);
        // playbackInfo.inPlaybackSession = false;
        console.log(
          "Playback Failed : %j",
          handlerInput.requestEnvelope.request.error
        );

        let stream_data = getRadioStation();
        console.log("stream: " + JSON.stringify(stream_data.url));
        let voice = setVoice('british');
        const speechText = `<voice name="${voice}">PLayback failed. Now playing ${stream_data.name} </voice>`;

        responseBuilder
          .speak(speechText)
          .addAudioPlayerPlayDirective("REPLACE_ALL", stream_data.url, stream_data.name, 0, null)
          .getResponse();
        return;
      default:
        throw new Error("Should never reach here!");
    }

    console.log("responseBuilder:" + JSON.stringify(responseBuilder));
    return responseBuilder.getResponse();
  }
};

//
const SystemExceptionHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type ===
      "System.ExceptionEncountered"
    );
  },
  handle(handlerInput) {
    console.log(
      `System exception encountered: ${
      handlerInput.requestEnvelope.request.reason
      }`
    );
  }
};

function getToken(handlerInput) {
  // Extracting token received in the request.
  return handlerInput.requestEnvelope.request.token;
}

async function getIndex(handlerInput) {
  // Extracting index from the token received in the request.
  const tokenValue = parseInt(handlerInput.requestEnvelope.request.token, 10);
  const attributes = await handlerInput.attributesManager.getPersistentAttributes();

  return attributes.playbackInfo.playOrder.indexOf(tokenValue);
}

function getOffsetInMilliseconds(handlerInput) {
  // Extracting offsetInMilliseconds received in the request.
  return handlerInput.requestEnvelope.request.offsetInMilliseconds;
}

const randomItem = (arrayOfItems) => {
  let i = 0;
  i = Math.floor(Math.random() * arrayOfItems.length);
  return (arrayOfItems[i]);
};

const getRadioStation = (slot_value) => {

  // console.log('slot_value: ' + slot_value);
  let _station = '';
  let _stream;

  if (slot_value) {
    console.log('slot_value: ' + slot_value);
    slot_value = slot_value.toLowerCase();
    _station = slot_value;
  }

  if (_station) {
    console.log('_station: ' + _station);
    _stream = streams[_station];
  } else {
    let rand_station = randomItem(stations);
    console.log('_station else: ' + rand_station);
    _stream = streams[rand_station];
  }

  console.log('stream: ' + JSON.stringify(_stream));
  let stream_name = _stream.name;
  let stream_url = randomItem(_stream.url);

  console.log('stream_name: ' + stream_name);
  console.log('stream_url: ' + stream_url);

  let data = {
    name: stream_name,
    url: stream_url
  };

  return data;
}

const setVoice = (lang) => {
  let voice = '';
  if (lang) {
    voice = random_item(polly[lang]);
  } else {
    let rand_lang = random_item(languages);
    voice = random_item(polly[rand_lang]);
  }
  return voice;
}

function callDirectiveService(handlerInput, speech) {
  const { requestEnvelope } = handlerInput
  const directiveServiceClient = handlerInput.serviceClientFactory.getDirectiveServiceClient()

  const directive = {
    header: {
      requestId: requestEnvelope.request.requestId
    },
    directive: {
      type: 'VoicePlayer.Speak',
      speech: speech
    }
  }
  return directiveServiceClient.enqueue(directive, requestEnvelope.context.System.apiEndpoint, requestEnvelope.context.System.apiAccessToken)
}
