/// <reference path="../.astro/types.d.ts" />

declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module "*.yml" {
    const value: any;
    export default value;
}

declare module "*.svg" {
    const value: string;
    export default value;
}

declare module "*.jpeg" {
    const value: string;
    export default value;
}

declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.png" {
    const value: string;
    export default value;
}
