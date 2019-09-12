/**
 * interface for the payload that are used for fetch
 * */
import {IFormulaHit, Iqvars} from '../interfaces';

export interface Ipayload {
  headers?: string | Header;
  body?: string | URLSearchParams;
}


export interface IMWSClientResult {
  total: number;
  entries: Array<IFormulaHit>;
  took?: number;
}

export interface ILTXResponse {
  status_code: number;
  log: string;
  result: string;
  status: string;
}

export interface IResponseType {
  from?: number /*limitmin that i will add if it is not in */;
  qvars: Array<Iqvars>;
  hits: Array<any>;
  total: number;
}

export interface IMWSAPIResponse extends IResponseType {
  took: number;
  kind: string;
  stats: any;
  size: number;
}

export interface IMWSResponse extends IResponseType {
  time: number /* time in ms time in ms?*/;
}
