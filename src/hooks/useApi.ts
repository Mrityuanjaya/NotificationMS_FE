import { useState } from "react";
import { AxiosResponse, AxiosError } from "axios";

export default (
    apiFunc: (...args: any[]) => Promise<AxiosResponse<any, any>>
) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const request = async (...args: any[]) => {
        setLoading(true);
        try {
            const result = await apiFunc(...args);
            setData(result.data);
            // setError("");
        } catch (err) {
            if (err instanceof AxiosError) setError(err.response?.data.detail);
            else setError("Unexpected Error!");
            // setData(()=>null);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        error,
        loading,
        request,
    };
};


