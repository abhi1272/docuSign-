import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'docusign';
  public esignUrl;
  public envelopId;
  public loading:boolean = false;
  public showIframe = false;
  public token = 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQsAAAABAAUABwCAiZ1SQdrXSAgAgMnAYITa10gCAPMr7mEkzeBJpeuKcme2hsgVAAEAAAAYAAEAAAAFAAAADQAkAAAAN2NmZTM1M2QtYzkxYy00MzJlLTlhOTAtNmVmMDAxZjdiYTdhIgAkAAAAN2NmZTM1M2QtYzkxYy00MzJlLTlhOTAtNmVmMDAxZjdiYTdhEgABAAAACwAAAGludGVyYWN0aXZlMACAiZ1SQdrXSDcA3E1Gcs2ZxEipdgXrzJv11w.LvrOlJwKeSM1MCxB0Nbeg_UVtLyMig_XqeajRgOXe-nZJsImbu7cwQlJzc59VBhAUGW1o4H3-CakYbBbqvdI0r_WbqAibMdfWuDvqn2pyJtERwEmUEVflXiyeIRDgZ-OWmvczCkRglX12GwrjisdzS9QqQ6jMajx-3aD78KIlqQIzy9z3YB9eeD9DpgLCp1C4xAlIrR31e_KboP4h_FMxdaK2OIO3A3_tFKAyEF0bwWO9w9UOhau0Lh91Qq-jPwsziiaH60RUCckVRC-jVOk_BEMlMV2sD9xWjEH71NGTxgF_t2ngH1c8VV9RENEJT9uVJl5r0iuQsWeab8ZbhQLGA'

  constructor(public http:HttpClient,public sanitizer: DomSanitizer){}

  ngOnInit(){
  }


  public getEnvelop(){
    this.loading = true
    let create_body = {
      "emailSubject": "Test",
      "status": "sent",
      "templateId": "0c4c6573-8c37-4735-926b-89e5c257e6ac"
    }

    this.http
    .post('https://demo.docusign.net/restapi/v2/accounts/10250998/envelopes', create_body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + this.token
      })
    }).subscribe((data)=>{
      this.envelopId = data['envelopeId']
      this.getEsignUrl()
    },(error)=>{
      console.log(error)
      this.loading = false
    }); 
  }

  getEsignUrl(){


    let envelope_body = {
      "authenticationMethod": "None",
      "email": "abhishek.kumar@niyuj.com",
      "returnUrl": "https://webhook.site/0d2d457d-14f5-4a06-887a-184d3a3f60ba",
      "userName": "Sagar "
    }

    this.http
    .post(`https://demo.docusign.net/restapi/v2/accounts/10250998/envelopes/${this.envelopId}/views/recipient`, envelope_body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + this.token
      })
    }).subscribe((data_url)=>{
      this.esignUrl =this.sanitizer.bypassSecurityTrustResourceUrl(data_url['url']); 
      this.loading = false
    },(error)=>{
      console.log(error)
      this.loading = false
    }); 
  }

}
