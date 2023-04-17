import { useState } from "react";
import { AxiosResponse } from "axios";

export default (apiFunc: (...args: any[]) => Promise<AxiosResponse<any, any>>) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const request = async (...args: any[]) => {
        setLoading(true);
        try {
            const result = await apiFunc(...args);
            setData(result.data);
        } catch (err) {
            if (err instanceof Error)
                setError(err.message);
            else 
                setError("Unexpected Error!");
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