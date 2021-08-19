import { useLocation } from "react-router-dom";

export default function useQueryParams(key) {
    const params = new URLSearchParams(useLocation().search)
    return params.get(key);
}
