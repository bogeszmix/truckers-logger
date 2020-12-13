import { Component, Input, OnInit } from "@angular/core";
import { TRANSLOCO_SCOPE } from "@ngneat/transloco";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import { TranslationService } from "src/app/translation/translation.service";
import { PdfExportModel } from "../../models/pdf-export.model";
import { ToastService } from "../toast/toast.service";

@Component({
  selector: "app-pdf-export",
  templateUrl: "./pdf-export.component.html",
  styleUrls: ["./pdf-export.component.scss"],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: "home", alias: "HOME" },
    },
  ],
})
export class PdfExportComponent implements OnInit {
  @Input() importData: PdfExportModel;
  pdfGeneratorObject: jsPDF;

  constructor(
    private toastService: ToastService,
    private translateService: TranslationService
  ) {}

  ngOnInit() {
    this.initJsPdf();
  }

  initJsPdf() {
    this.pdfGeneratorObject = new jsPDF();
  }

  export() {
    if (
      this.importData &&
      this.importData.data &&
      this.importData.data.length > 0
    ) {
      autoTable(this.pdfGeneratorObject, {
        head: this.importData.headers,
        body: this.importData.data,
      });

      this.pdfGeneratorObject.save(
        `Export_${moment().format(moment.HTML5_FMT.DATETIME_LOCAL)}.pdf`
      );
      this.toastService.showSuccess(
        this.translateService.getInstant("HOME.EXPORT.SUCCESS_MESSAGE_EXPORT")
      );
      this.initJsPdf();
    } else {
      this.toastService.showAlert(
        this.translateService.getInstant("HOME.EXPORT.WARNING_EMPTY_EXPORT")
      );
    }
  }
}
