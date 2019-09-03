/**
 * interface for the payload that are used for fetch
 * */
export interface Ipayload {
  headers?: string | Header;
  body?: string | URLSearchParams;
}
