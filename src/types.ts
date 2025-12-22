export interface ProjectConfig {
  projectName: string;
  devTools: string[];
  uiFramework: string;
  database: string;
  backendTools: string[];
  payment: string;
  analytics: boolean;
  seo: boolean;
  blog: boolean;
  auth: string;
}

export interface PackageJson {
  name: string;
  version: string;
  private: boolean;
  scripts: Record<string, string>;
  devDependencies: Record<string, string>;
  dependencies: Record<string, string>;
  type: string;
}
