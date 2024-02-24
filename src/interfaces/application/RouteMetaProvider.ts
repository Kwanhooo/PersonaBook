export interface RouteMetaProvider extends Record<string | number | symbol, unknown> {
  title: string;
  isAuthRequired: boolean;
  isShowHeader: boolean;
  isShowFooter: boolean;

  headerTitle?: string;
  headerLogo?: string;

  [key: string]: any;
}
