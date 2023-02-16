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

module.export = send;
