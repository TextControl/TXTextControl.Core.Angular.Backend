function loadDocument(document) {
  TXTextControl.loadDocument(TXTextControl.streamType.InternalUnicodeFormat, document);
}

function saveDocument() {
  return new Promise(resolve => {
    TXTextControl.saveDocument(TXTextControl.streamType.InternalUnicodeFormat, function (e) {
      resolve(e.data);
    });
  });
}

function loadData(JsonData) {
  TXTextControl.addEventListener("textControlLoaded", function () {
    TXTextControl.loadJsonData(JSON.stringify(JsonData));
  });
}
