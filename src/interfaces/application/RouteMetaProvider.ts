export interface RouteMetaProvider extends Record<string | number | symbol, unknown> {
  title: string;
  isAuthRequired: boolean;
  isShowHeader: boolean;
  isShowFooter: boolean;

  [key: string]: any;
}
