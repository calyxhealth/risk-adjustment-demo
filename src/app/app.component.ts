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
import { debounceTime, distinctUntilChanged, switchMap, tap, map } from "rxjs/operators"

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
  code_map: any

  rafScore$: any

  @ViewChild("diagnosisInput") diagnosisInput: ElementRef<HTMLInputElement>
  @ViewChild("auto") matAutocomplete: MatAutocomplete

  rafScoreForm: FormGroup
  url = "https://7dw0imxsfi.execute-api.us-west-2.amazonaws.com/api/"
  icd_url = "https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search"

  constructor(private http: HttpClient, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.hcc_to_icd_list$ = this.http.get("./assets/hcc_to_icd_2018.json")
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
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((term: string) => {
        let queryterms = term
          .split(" ")
          .filter(s => Boolean(s.trim()))
          .map(s =>
            // For ICD-like patterns, insert the period so search matches
            s.length > 3 && s.match(/^[a-zA-Z][0-9][0-9AB][0-9a-zA-Z]/)
              ? s.slice(0, 3) + "." + s.slice(3)
              : s
          )
        return this.http
          .get(this.icd_url, {
            params: new HttpParams()
              .set("terms", queryterms[0])
              .set(
                "q",
                queryterms
                  .slice(1)
                  .map(s => s + "*")
                  .join(" ")
              )
              .set("maxList", "250")
              .set("sf", "code,name")
              .set("df", "code,name"),
          })
          .pipe(
            map(
              response =>
                response[3].map(
                  pair =>
                    <IcdCode>{
                      code: pair[0],
                      description: pair[1],
                      is_billable: this.code_map[pair[0].replace(/\./g, "")][
                        "is_valid"
                      ],
                      hccs: this.code_map[pair[0].replace(/\./g, "")]["hccs"],
                    }
                )
              //.sort((a, b) => a.code.localeCompare(b.code))
            )
          )
      })
      // this.http.get<IcdCode[]>(this.url + "icd_10_codes", {
      //   params: new HttpParams().set("query", term).set("ignore_case", "true"),
      // })
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
              .set(
                "diagnoses",
                this.selectedDiagnoses
                  .map(d => d.split(":")[0].replace(/\./g, ""))
                  .join()
              )
              .set("sex", form.sex)
              .set("age", form.age)
              .set("model", form.model),
          })
          .pipe(tap(x => console.log(x)))
        //.subscribe(response => console.log(response))
      })
  }

  search(term: string): void {
    let normalized_term = term.trim()
    if (normalized_term.length > 2) {
      this.searchTerms.next(normalized_term)
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
