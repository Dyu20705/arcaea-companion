import { RefObject, useEffect, useRef } from "react";
import { UIMatch, useLocation, useMatches, useNavigationType } from "react-router";
import { AppRouteHandler } from "../app/router";

interface Props {
    mainRef: RefObject<HTMLElement | null>;
}

const productName = "Arcaea Companion";

export function RouteTransitionManager({ mainRef }: Props) {
    // location has properties like pathname, search, hash, and state - reperents current URL
    const location = useLocation();

    // navigationType can be 'PUSH', 'POP', or 'REPLACE' - reperents how the user navigated to the current URL
    const navigationType = useNavigationType();

    // matches is an array of route objects that match the current URL
    const matches = useMatches() as UIMatch<unknown, AppRouteHandler>[];
    
    // isInitialRender is a ref that keeps track of whether this is the first render of the component
    const isInitialRender = useRef(true);

    const currentTitle =
        [...matches]
            .reverse()
            .find((match) => match.handle?.title)
            ?.handle?.title ?? productName;

    // useEffect is a hook that runs after the component renders
    useEffect(() => {
        // set the document title to the current title
        document.title =
            currentTitle === "Home"
            ? productName
            : `${currentTitle} - ${productName}`;
    }, [currentTitle]);

    useEffect(() => {
        // if this is the initial render, set isInitialRender to false and return
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        const frame = window.requestAnimationFrame(() => {
            mainRef.current?.focus({preventScroll: true});
            if(navigationType !== "POP") {
                window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            }
        });
        return () => {
            window.cancelAnimationFrame(frame);
        };
    }, [location.key, mainRef, navigationType]);

    return (
        <span className="visually-hidden" aria-live="polite" aria-atomic="true">
            {currentTitle}
        </span>
    );
}