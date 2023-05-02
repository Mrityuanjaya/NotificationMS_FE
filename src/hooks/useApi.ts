import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

export default (
    apiFunc: (...args: any[]) => Promise<AxiosResponse<any, any>>
) => {
    const [data, setData] = useState<null|any>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const request = async (...args: any[]) => {
        setLoading(true);
        try {
            const result = await apiFunc(...args);
            console.log(result.data)
            setData(result.data);
            setError("");
        } catch (err) {
            if (err instanceof AxiosError) setError(err.response?.data.detail);
            else setError("Unexpected Error!");
            setData(() => null);
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
