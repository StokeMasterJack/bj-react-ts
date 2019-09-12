import React from "react";
import {useRef} from "react";
import {useState} from "react";

function ensure<T>(v: T | null | undefined): T {
    if (v === null || v === undefined) {
        throw Error();
    }
    return v;
}

export const RefsDemo = () => {

    const [v1, setV1] = useState<string>("");
    const [v2, setV2] = useState<string>("");
    const ref = useRef<HTMLInputElement | null>(null);


    // const onClick = ()=>{
    //     ref.current = "ff";
    // };

    return <div>
        <h1>Refs</h1>
        <input ref={(el) => ref.current = el} value={v1} onChange={e => setV1(e.target.value)}/>
        <input value={v2} onChange={e => setV2(e.target.value)}/>
        <button onClick={() => ensure(ref.current).focus()}>Click</button>

    </div>;
};

// noinspection JSUnusedGlobalSymbols
export const CInput = ({autoFocus}: { autoFocus: boolean }) => {
    return <input ref={(el) => {
        if (!!el && autoFocus) {
            el.focus();
        }
    }}/>;
};