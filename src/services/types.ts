export interface ApiParams {
  urlParams?: Record<string, string | number>;
  queryParams?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  body?: unknown;
}