// Create a client instance
client = new Paho.MQTT.Client("broker.emqx.io", Number(8084), "ClientID"+Math.random().toString(36).substr(2, 9));
client.startTrace();
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
// client.reconnect = true;
client.connect({onSuccess:onConnect,
                useSSL: true});
console.log("mencoba untuk terkoneksi...");

// called when the client connects
function onConnect() {
  // Jika koneksi berhasil, langsung respon
  console.log("Koneksi Berhasil");
  client.subscribe("mebaris_M234jkjDS4Jk23j");
  client.subscribe("mebaris_M234jkjDS4Jk23j/nurusallam");
  //message = new Paho.MQTT.Message('{"suhu":30, "lembap":70}');
  //message.destinationName = "mebaris_M234jkjDS4Jk23j/nurusallam";
  //client.send(message);
  console.log(client.getTraceLog());
  //client.getTraceLog().forEach(function(line){
  //console.log('Trace: ' + line)
  //});
  //newMessage = new Paho.MQTT.Message("Sent using synonyms!");
  //newMessage.topic = "mebaris01/nurusallam/";
  //client.publish(message)
  //client.publish("mebaris01/nurusallam/suhu", "Hello from a better publish call!", 1, false)

  //topicMessage = new Paho.MQTT.Message("This is a message where the topic is set by setTopic");
  //topicMessage.topic = "mebaris01/nurusallam/suhu";
  //client.publish(topicMessage)
}

// bila koneksi terputus
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Koneksi Terputus: "+responseObject.errorMessage);
  }
}

// bila ada pesan masuk
var myData = 0;
var myTemp = 0;
var myHumid = 0;

function onMessageArrived(msg) {
	if (msg.destinationName == "mebaris_M234jkjDS4Jk23j") {
	console.log("Status: "+msg.payloadString)
	     	}
	else if (msg.destinationName == "mebaris_M234jkjDS4Jk23j/nurusallam") {
	var myData = JSON.parse(msg.payloadString);
	var myTemp = document.getElementById("suhu").innerHTML = (myData.suhu+"°");
	var myHumid = document.getElementById("lembap").innerHTML = (myData.lembap+"%")
		}
	else {console.log("Pesan :"+msg.payloadString)
		}
	}
