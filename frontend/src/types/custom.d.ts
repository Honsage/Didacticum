declare module '*.svg' {
    import * as React from 'react';
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.svg?react' {
    import React from 'react';
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
} 