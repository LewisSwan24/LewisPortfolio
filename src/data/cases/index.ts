import { connectCase } from "./connect";
import { spectraCase } from "./spectra";
import { mazeCase } from "./maze";
import { hoopCase } from "./hoop";
import { pricewiseCase } from "./pricewise";
import { gapmapperCase } from "./gapmapper";
import { rulesCase } from "./rules";
import { grasslandCase } from "./grassland";
import { onthebeatCase } from "./onthebeat";
import { lamplightCase } from "./lamplight";
import { autofillCase } from "./autofill";
import { walkieCase } from "./walkie";
import { fencepostCase } from "./fencepost";
import type { CaseRecord } from "@/lib/cases/schema";

export const ALL_CASE_RECORDS: readonly CaseRecord[] = [
  connectCase,
  spectraCase,
  mazeCase,
  hoopCase,
  pricewiseCase,
  gapmapperCase,
  rulesCase,
  grasslandCase,
  onthebeatCase,
  lamplightCase,
  autofillCase,
  walkieCase,
  fencepostCase,
];
