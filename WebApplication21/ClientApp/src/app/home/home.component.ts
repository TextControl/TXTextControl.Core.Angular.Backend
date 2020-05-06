import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const loadDocument: any;
declare const saveDocument: any;
declare const loadData: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent {
  public _http: HttpClient;
  public _baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._http = http;
    this._baseUrl = baseUrl;

    // get data source structure from Web API endpoint 'LoadData'
    http.get<any>(baseUrl + 'textcontrol/loaddata').subscribe(result => {

      // call JavaScript function from injected 'textcontrol.js'
      loadData(result);

    }, error => console.error(error));
  }

  async onClickMergeDocument() {

    // get the saved document from TXTextControl
    let postDocument: MergedDocument = {
      document: await saveDocument(),
    };

    // post the document to endpoint 'MergeDocument'
    this._http.post<MergedDocument>(this._baseUrl + 'textcontrol/mergedocument', postDocument).subscribe(result => {

      // load the results into TXTextControl
      loadDocument(result.document);

    }, error => console.error(error));
  
  }
}

interface MergedDocument {
  document: string;
}
