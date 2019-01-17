import { COMMA, ENTER } from "@angular/cdk/keycodes"
import { Component, ElementRef, ViewChild } from "@angular/core"
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms"

import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocomplete,
  MatRadioButton,
  MatRadioGroup,
} from "@angular/material"
import { Observable, Subject, of } from "rxjs"
import { HttpClient, HttpParams } from "@angular/common/http"
import { debounceTime, distinctUntilChanged, switchMap, tap } from "rxjs/operators"
import * as lunr from "lunr"

import { HCC_LABELS, HCC_GRAPH } from "./data/hccs_v22"
class IcdCode {
  code: string
  description: string
  hccs: number[]
  is_billable: Boolean
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})
export class AppComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA]

  searchTerms = new Subject<string>()
  icdCodes$: Observable<IcdCode[]>

  selectedDiagnoses: string[] = []

  hcc_labels = HCC_LABELS
  hcc_graph = HCC_GRAPH
  hcc_list: string[] = Object.keys(HCC_LABELS)
  hcc_to_icd_list$: any
  lunr_index: lunr.Index
  code_map: any

  rafScore$: any

  @ViewChild("diagnosisInput") diagnosisInput: ElementRef<HTMLInputElement>
  @ViewChild("auto") matAutocomplete: MatAutocomplete

  rafScoreForm: FormGroup
  url = "https://7dw0imxsfi.execute-api.us-west-2.amazonaws.com/api/"

  constructor(private http: HttpClient, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.hcc_to_icd_list$ = this.http.get("./assets/hcc_to_icd_2018.json")
    this.http.get("./assets/icd_codes_index_2018.json").subscribe(data => {
      this.lunr_index = lunr.Index.load(data)
    })
    this.http.get("./assets/icd_codes_map_2018.json").subscribe(data => {
      this.code_map = data
    })

    this.rafScoreForm = this._formBuilder.group({
      diagnoses: [""],
      age: ["70", Validators.required],
      sex: [1, Validators.required],
      model: ["cna", Validators.required],
    })

    this.icdCodes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(
        (term: string) => {
          let queryterms = term
            .trim()
            .split(" ")
            .filter(s => Boolean(s.trim()) && s.trim().length > 2)
            .map(s => "+" + s.trim() + "*")
            .join(" ")
          console.log(queryterms)
          return of(
            this.lunr_index
              .search(queryterms)
              .map(match => {
                let code = match.ref
                let codedetails = this.code_map[code]
                let obj = {
                  code: code,
                  description: codedetails.long_description,
                  is_billable: codedetails.is_valid,
                  hccs: codedetails.hccs,
                }
                return obj
              })
              .sort((a, b) => a.code.localeCompare(b.code))
          )
        }
        // this.http.get<IcdCode[]>(this.url + "icd_10_codes", {
        //   params: new HttpParams().set("query", term).set("ignore_case", "true"),
        // })
      )
    )

    this.rafScoreForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(form => {
        this.rafScore$ = this.http
          .get(this.url + "risk_adjust", {
            params: new HttpParams()
              .set("diagnoses", this.selectedDiagnoses.map(d => d.split(":")[0]).join())
              .set("sex", form.sex)
              .set("age", form.age)
              .set("model", form.model),
          })
          .pipe(tap(x => console.log(x)))
        //.subscribe(response => console.log(response))
      })
  }

  search(term: string): void {
    if (term.trim().length > 2) {
      this.searchTerms.next(term)
    }
  }

  add(event: MatChipInputEvent): void {
    // Add diagnoses only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input
      const value = event.value

      // Add our diagnoses
      if ((value || "").trim()) {
        this.selectedDiagnoses.push(value.trim())
      }

      // Reset the input value
      if (input) {
        input.value = ""
      }

      this.rafScoreForm.get("diagnoses").setValue(null)
    }
  }

  remove(diagnoses: string): void {
    const index = this.selectedDiagnoses.indexOf(diagnoses)

    if (index >= 0) {
      this.selectedDiagnoses.splice(index, 1)
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event)
    this.selectedDiagnoses.push(event.option.value)
    this.diagnosisInput.nativeElement.value = ""
    this.rafScoreForm.get("diagnoses").setValue(null)
  }
}
