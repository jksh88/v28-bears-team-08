import { DataModel } from "../../DataModel";
import { Schema } from "mongoose";
import { PersonModel } from "./PersonModel";
import { ModelManager } from "../../../Core";

export class ApplicationModel implements DataModel {
  typeName: String = "application";
  model: Schema;

  constructor() {
    this.model = new Schema({
      household: [PersonModel],
      address: String,
      landlord: PersonModel,
      // rfa = Reason for Assistance
      rfa: String,
      // think this needs a model
      income: {},
      // document uploads are going to have to use gridfs
      documents: Array,
      meta: {
        status: String,
        dateSubmitted: Date,
        assignedStaff: ModelManager.user,
        staffHistory: [ModelManager.user],
        dateFirstAssigned: Date,
        dateMarkedComplete: Date,
        dateProcessed: Date,
        dateApprovedDenied: Date,
        requirements: {
          adultID: Boolean,
          childID: Boolean,
          income: Boolean,
          hardship: Boolean,
          lease: {
            contract: Boolean,
            voucher: Boolean,
            ledger: Boolean,
          },
          mortgage: {
            statement: Boolean,
            // mortgage assistance requires a 1098 on file for the creditor's EIN/TIN
            taxForm: Boolean,
          },
          utilities: {
            cps: Boolean,
            saws: Boolean,
            internet: Boolean,
          },
        },
      },
    });
  }
}
