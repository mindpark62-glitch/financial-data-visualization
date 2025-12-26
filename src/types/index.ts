export interface CorpInfo {
  corp_code: string;
  corp_name: string;
  corp_eng_name: string;
  stock_code: string;
  modify_date: string;
}

export interface FinancialData {
  rcept_no: string;
  reprt_code: string;
  bsns_year: string;
  corp_code: string;
  stock_code: string;
  fs_div: string;
  fs_nm: string;
  sj_div: string;
  sj_nm: string;
  account_nm: string;
  thstrm_nm: string;
  thstrm_dt: string;
  thstrm_amount: string;
  frmtrm_nm: string;
  frmtrm_dt: string;
  frmtrm_amount: string;
  bfefrmtrm_nm?: string;
  bfefrmtrm_dt?: string;
  bfefrmtrm_amount?: string;
  ord: string;
  currency: string;
}

export interface OpenDartResponse {
  status: string;
  message: string;
  list?: FinancialData[];
}

export interface ChartDataPoint {
  name: string;
  당기: number;
  전기: number;
  전전기?: number;
}

export type ReportType = '11011' | '11012' | '11013' | '11014';

export interface SearchParams {
  corpCode: string;
  year: string;
  reportType: ReportType;
}

