/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { NodeObject } from "jsonld";
import { SelectEvent } from "./utils/events";
export { NodeObject } from "jsonld";
export { SelectEvent } from "./utils/events";
export namespace Components {
    interface LmdEditor {
        "config": object | string;
        "data": object | string;
    }
    interface LmdInput {
        "data": NodeObject[];
        "isEditable": boolean;
        "selector": (string|number)[];
    }
    interface LmdSidebar {
        "data": NodeObject[];
        "selectedIndex"?: number;
    }
    interface LmdSidebarElement {
        "data": NodeObject[];
        "globalSelector"?: number;
        "selector"?: number;
    }
    /**
     * This component represents the properties of a selected entity.
     */
    interface LmdView {
        "data": NodeObject[];
        /**
          * The index of the object to render.
         */
        "selectedIndex"?: number;
    }
    interface LmdViewEdit {
        "data": NodeObject[];
        "selectedIndex": number;
        "subElement"?: string;
    }
    interface LmdViewLink {
        "data": NodeObject[];
        "label": string;
        "selector"?: number;
    }
}
export interface LmdEditorCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLLmdEditorElement;
}
export interface LmdInputCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLLmdInputElement;
}
export interface LmdSidebarElementCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLLmdSidebarElementElement;
}
export interface LmdViewCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLLmdViewElement;
}
export interface LmdViewEditCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLLmdViewEditElement;
}
export interface LmdViewLinkCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLLmdViewLinkElement;
}
declare global {
    interface HTMLLmdEditorElement extends Components.LmdEditor, HTMLStencilElement {
    }
    var HTMLLmdEditorElement: {
        prototype: HTMLLmdEditorElement;
        new (): HTMLLmdEditorElement;
    };
    interface HTMLLmdInputElement extends Components.LmdInput, HTMLStencilElement {
    }
    var HTMLLmdInputElement: {
        prototype: HTMLLmdInputElement;
        new (): HTMLLmdInputElement;
    };
    interface HTMLLmdSidebarElement extends Components.LmdSidebar, HTMLStencilElement {
    }
    var HTMLLmdSidebarElement: {
        prototype: HTMLLmdSidebarElement;
        new (): HTMLLmdSidebarElement;
    };
    interface HTMLLmdSidebarElementElement extends Components.LmdSidebarElement, HTMLStencilElement {
    }
    var HTMLLmdSidebarElementElement: {
        prototype: HTMLLmdSidebarElementElement;
        new (): HTMLLmdSidebarElementElement;
    };
    /**
     * This component represents the properties of a selected entity.
     */
    interface HTMLLmdViewElement extends Components.LmdView, HTMLStencilElement {
    }
    var HTMLLmdViewElement: {
        prototype: HTMLLmdViewElement;
        new (): HTMLLmdViewElement;
    };
    interface HTMLLmdViewEditElement extends Components.LmdViewEdit, HTMLStencilElement {
    }
    var HTMLLmdViewEditElement: {
        prototype: HTMLLmdViewEditElement;
        new (): HTMLLmdViewEditElement;
    };
    interface HTMLLmdViewLinkElement extends Components.LmdViewLink, HTMLStencilElement {
    }
    var HTMLLmdViewLinkElement: {
        prototype: HTMLLmdViewLinkElement;
        new (): HTMLLmdViewLinkElement;
    };
    interface HTMLElementTagNameMap {
        "lmd-editor": HTMLLmdEditorElement;
        "lmd-input": HTMLLmdInputElement;
        "lmd-sidebar": HTMLLmdSidebarElement;
        "lmd-sidebar-element": HTMLLmdSidebarElementElement;
        "lmd-view": HTMLLmdViewElement;
        "lmd-view-edit": HTMLLmdViewEditElement;
        "lmd-view-link": HTMLLmdViewLinkElement;
    }
}
declare namespace LocalJSX {
    interface LmdEditor {
        "config": object | string;
        "data": object | string;
        "onDataUpdated"?: (event: LmdEditorCustomEvent<NodeObject | NodeObject[] | string>) => void;
        "onEditorClosed"?: (event: LmdEditorCustomEvent<NodeObject | NodeObject[] | undefined>) => void;
    }
    interface LmdInput {
        "data"?: NodeObject[];
        "isEditable"?: boolean;
        "onElementSelected"?: (event: LmdInputCustomEvent<SelectEvent>) => void;
        "selector"?: (string|number)[];
    }
    interface LmdSidebar {
        "data": NodeObject[];
        "selectedIndex"?: number;
    }
    interface LmdSidebarElement {
        "data": NodeObject[];
        "globalSelector"?: number;
        "onElementSelected"?: (event: LmdSidebarElementCustomEvent<SelectEvent>) => void;
        "selector"?: number;
    }
    /**
     * This component represents the properties of a selected entity.
     */
    interface LmdView {
        "data": NodeObject[];
        "onRedraw"?: (event: LmdViewCustomEvent<CustomEvent>) => void;
        /**
          * The index of the object to render.
         */
        "selectedIndex"?: number;
    }
    interface LmdViewEdit {
        "data": NodeObject[];
        "onRedraw"?: (event: LmdViewEditCustomEvent<CustomEvent>) => void;
        "selectedIndex": number;
        "subElement"?: string;
    }
    interface LmdViewLink {
        "data"?: NodeObject[];
        "label"?: string;
        "onElementSelected"?: (event: LmdViewLinkCustomEvent<SelectEvent>) => void;
        "selector"?: number;
    }
    interface IntrinsicElements {
        "lmd-editor": LmdEditor;
        "lmd-input": LmdInput;
        "lmd-sidebar": LmdSidebar;
        "lmd-sidebar-element": LmdSidebarElement;
        "lmd-view": LmdView;
        "lmd-view-edit": LmdViewEdit;
        "lmd-view-link": LmdViewLink;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "lmd-editor": LocalJSX.LmdEditor & JSXBase.HTMLAttributes<HTMLLmdEditorElement>;
            "lmd-input": LocalJSX.LmdInput & JSXBase.HTMLAttributes<HTMLLmdInputElement>;
            "lmd-sidebar": LocalJSX.LmdSidebar & JSXBase.HTMLAttributes<HTMLLmdSidebarElement>;
            "lmd-sidebar-element": LocalJSX.LmdSidebarElement & JSXBase.HTMLAttributes<HTMLLmdSidebarElementElement>;
            /**
             * This component represents the properties of a selected entity.
             */
            "lmd-view": LocalJSX.LmdView & JSXBase.HTMLAttributes<HTMLLmdViewElement>;
            "lmd-view-edit": LocalJSX.LmdViewEdit & JSXBase.HTMLAttributes<HTMLLmdViewEditElement>;
            "lmd-view-link": LocalJSX.LmdViewLink & JSXBase.HTMLAttributes<HTMLLmdViewLinkElement>;
        }
    }
}
