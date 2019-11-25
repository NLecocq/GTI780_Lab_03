var mqtt = require('mqtt');

var client = mqtt.connect('mqtt://broker.hivemq.com');

const temp_topic = 'gti780a2019/stationmeteo03/temperature';

const bmp180 = require('bmp180-sensor');

async function sendData() {
    const data = await readBmp180();

    console.log(data);

    client.publish(temp_topic, data.temperature.toString());
}

async function readBmp180() {
    const sensor = await bmp180({
        address: 0x77,
        mode: 1,
    });

    const data = await sensor.read();

    await sensor.close();
    return data;
}


client.on('connect', function () {
    client.subscribe(temp_topic, function (err) {
        if (err) {
            console.log('Connection to temperature topic failed!');
            // process.exit()
        }
    })
});

client.on('connect', function () {
    client.subscribe(pression_topic, function (err) {
        if (err) {
            console.log('Connection to pressure topic failed!');
            process.exit()
        }
    })
});

sendData();
setInterval(sendData, 1000);
