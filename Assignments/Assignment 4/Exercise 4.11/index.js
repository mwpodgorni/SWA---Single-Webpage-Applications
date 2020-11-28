// const http = require("http");
// const express = require("express");
// const path = require("path");
// const app = express();

// app.use(express.json());
// app.use(express.static("express"));
// app.use("/", function (req, res) {
//   res.sendFile(path.join(__dirname + "/index.html"));
// });
// const server = http.createServer(app);
// const port = 3000;
// server.listen(port);
// console.debug("Server listening on port " + port);

const {
  timer,
  Observable,
  Subject,
  ReplaySubject,
  from,
  of,
  range,
  interval,
  fromEvent,
  BehaviorSubject,
} = require("rxjs");
const { ajax } = require("rxjs/ajax");

const {
  map,
  filter,
  switchMapTo,
  concatMap,
  pairwise,
  takeWhile,
  first,
  share,
  switchMap,
  take,
  distinctUntilChanged,
} = require("rxjs/operators");

var warningsData = [];
var filteredData = [];

const poll_url = (url) => interval(1000).pipe(concatMap(() => ajax.getJSON(url)));

//get warnings arr only
const observable = poll_url("http://localhost:8080/warnings").pipe(map((res) => res.warnings));

//checking for change, subscribing
const sub = observable
  .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
  .subscribe({
    next: (event) => {
      console.log("event:", event);
      var ids = [];
      warningsData.forEach((e) => {
        ids.push(e.id);
      });
      event.forEach((element) => {
        if (ids.includes(element.id)) {
          for (let i = 0; i < warningsData.length; i++) {
            if (element.id == warningsData[i].id) {
              if (warningsData[i].oldValue) {
                warningsData[i].oldValue = warningsData[i].newValue;
                warningsData[i].newValue.severity = element.severity;
                warningsData[i].newValue.prediction = element.prediction;
              } else {
                let newObject = {
                  id: warningsData[i].id,
                  oldValue: { severity: warningsData[i].severity, prediction: warningsData[i].prediction },
                  newValue: { severity: element.severity, prediction: element.prediction },
                };
                warningsData[i] = newObject;
              }
            }
          }
          // warningsData.forEach((e) => {});
        } else {
          warningsData.push(element);
        }
      });
      setSeverity();
    },
    error: (error) => console.log(error),
    complete: () => console.log("complete!"),
  });
window.setSeverity = function () {
  var severityLevel = document.getElementById("severity-level");
  filteredData = [];
  if (severityLevel.value != "Choose...") {
    for (let i = 0; i < warningsData.length; i++) {
      if (warningsData[i].prediction) {
        if (warningsData[i].severity >= parseInt(severityLevel.value)) {
          filteredData.push(warningsData[i]);
        }
      } else if (warningsData[i].newValue) {
        if (warningsData[i].newValue.severity >= parseInt(severityLevel.value)) {
          filteredData.push(warningsData[i]);
        }
      }
    }
    updateData(filteredData);
  } else {
    updateData(warningsData);
  }
};
function updateData(warningsData) {
  const warningsList = document.getElementById("warnings-list");
  $("#warnings-list").empty();
  warningsData.forEach((element) => {
    var node = createPrediction(element);
    warningsList.appendChild(node);
  });
}
function createPrediction(p) {
  var node = document.createElement("li");
  var br = document.createElement("br");
  node.appendChild(document.createTextNode("ID: " + p.id));
  node.appendChild(br);
  br = document.createElement("br");
  if (p.prediction) {
    node.appendChild(document.createTextNode("Severity: " + p.severity));
  } else if (p.newValue && p.newValue.prediction != null) {
    node.appendChild(
      document.createTextNode(
        "Severity: Previous value:" + p.oldValue.severity + "   |   New value: " + p.newValue.severity
      )
    );
  } else {
    node.appendChild(document.createTextNode("Severity: 0"));
  }
  node.appendChild(br);
  node.appendChild(document.createTextNode("Prediction:"));

  var predictionList = document.createElement("ul");
  predictionList.className += "list-group-item";
  if (p.prediction) {
    predictionList.appendChild(document.createTextNode("Type: " + p.prediction.type));
    br = document.createElement("br");
    predictionList.appendChild(br);
    var date = new Date(p.prediction.time);
    predictionList.appendChild(
      document.createTextNode("Time: " + date.toLocaleDateString() + ", " + date.toLocaleTimeString())
    );
    br = document.createElement("br");
    predictionList.appendChild(br);
    predictionList.appendChild(document.createTextNode("Place: " + p.prediction.place));
    br = document.createElement("br");
    predictionList.appendChild(br);
    predictionList.appendChild(document.createTextNode("From: " + p.prediction.from));
    br = document.createElement("br");
    predictionList.appendChild(br);
    predictionList.appendChild(document.createTextNode("To: " + p.prediction.to));
    br = document.createElement("br");
    predictionList.appendChild(br);
    predictionList.appendChild(document.createTextNode("Unit: " + p.prediction.unit));
    if (p.prediction.precipitation_types) {
      br = document.createElement("br");
      predictionList.appendChild(br);
      predictionList.appendChild(document.createTextNode("Precipitation types:: " + p.prediction.precipitation_types));
    }
    if (p.prediction.directions) {
      br = document.createElement("br");
      predictionList.appendChild(br);
      predictionList.appendChild(document.createTextNode("Directions: " + p.prediction.directions));
    }
  } else if (p.newValue && p.newValue.prediction != null) {
    predictionList.appendChild(document.createTextNode("Type: " + p.oldValue.prediction.type));
    br = document.createElement("br");
    predictionList.appendChild(br);
    var dateOld = new Date(p.oldValue.prediction.time);
    var dateNew = new Date(p.newValue.prediction.time);
    predictionList.appendChild(
      document.createTextNode(
        "Time: Previous value:" +
          dateOld.toLocaleDateString() +
          ", " +
          dateOld.toLocaleTimeString() +
          " | New value: " +
          dateNew.toLocaleDateString() +
          ", " +
          dateNew.toLocaleTimeString()
      )
    );
    br = document.createElement("br");
    predictionList.appendChild(br);
    predictionList.appendChild(
      document.createTextNode(
        "Place: Previous value: " + p.oldValue.prediction.place + "   |   New value: " + p.newValue.prediction.place
      )
    );
    br = document.createElement("br");
    predictionList.appendChild(br);
    predictionList.appendChild(
      document.createTextNode(
        "From: Previous value:  " + p.oldValue.prediction.from + "   |   New value: " + p.newValue.prediction.from
      )
    );
    br = document.createElement("br");
    predictionList.appendChild(br);
    predictionList.appendChild(
      document.createTextNode(
        "To: Previous value: " + p.oldValue.prediction.to + "   |   New value: " + p.newValue.prediction.to
      )
    );
    br = document.createElement("br");
    predictionList.appendChild(br);
    predictionList.appendChild(
      document.createTextNode(
        "Unit: Previous: " + p.oldValue.prediction.unit + "   |   New: " + p.newValue.prediction.unit
      )
    );
    if (p.newValue.precipitation_types) {
      br = document.createElement("br");
      predictionList.appendChild(br);
      predictionList.appendChild(
        document.createTextNode(
          "Precipitation types: Previous: " +
            p.oldValue.prediction.precipitation_types +
            "   |   New: " +
            p.newValue.prediction.precipitation_types
        )
      );
    }
    if (p.newValue.directions) {
      br = document.createElement("br");
      predictionList.appendChild(br);
      predictionList.appendChild(
        document.createTextNode(
          "Directions: Previous: " +
            p.oldValue.prediction.directions +
            "   |   New: " +
            p.newValue.prediction.directions
        )
      );
    }
  } else {
    predictionList.appendChild(document.createTextNode("Prediction Cancelled"));
  }
  node.appendChild(predictionList);

  node.className += "list-group-item";
  return node;
}
window.turnOnWarnings = function () {
  const turnOnButton = document.getElementById("turn-on");
  const turnOffButton = document.getElementById("turn-off");
  turnOnButton.disabled = true;
  turnOffButton.disabled = false;
  console.log("sub");
  observable.pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))).subscribe({
    next: (event) => {
      console.log("event:", event);
      var ids = [];
      warningsData.forEach((e) => {
        ids.push(e.id);
      });
      event.forEach((element) => {
        if (ids.includes(element.id)) {
          for (let i = 0; i < warningsData.length; i++) {
            if (element.id == warningsData[i].id) {
              if (warningsData[i].oldValue) {
                warningsData[i].oldValue = warningsData[i].newValue;
                warningsData[i].newValue.severity = element.severity;
                warningsData[i].newValue.prediction = element.prediction;
              } else {
                let newObject = {
                  id: warningsData[i].id,
                  oldValue: { severity: warningsData[i].severity, prediction: warningsData[i].prediction },
                  newValue: { severity: element.severity, prediction: element.prediction },
                };
                warningsData[i] = newObject;
              }
            }
          }
          // warningsData.forEach((e) => {});
        } else {
          warningsData.push(element);
        }
      });
      setSeverity();
    },
    error: (error) => console.log(error),
    complete: () => console.log("complete!"),
  });
};
window.turnOffWarnings = function () {
  const turnOnButton = document.getElementById("turn-on");
  const turnOffButton = document.getElementById("turn-off");
  turnOnButton.disabled = false;
  turnOffButton.disabled = true;
  console.log("unsub");
  sub.unsubscribe();
};
