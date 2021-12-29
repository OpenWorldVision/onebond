import qs from "qs";
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

function useReferral() {
    const location = useLocation();

    const refAddress = useMemo(() => {
        const params = qs.parse(location.search, { ignoreQueryPrefix: true });
        if (params?.r) {
            return params?.r as string;
        }
        return "";
    }, [location.search]);

    return refAddress;
}

export default useReferral;
