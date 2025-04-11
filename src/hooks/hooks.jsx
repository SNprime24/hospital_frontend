import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useErrors = (errors = []) => {
    useEffect(() => {
        errors?.forEach(({ isError, error, fallback }) => {
            if(isError) {
                if(fallback) fallback();
                else toast.error(error?.data?.message || "Something went wrong");
            }
        })
    }, [errors]);
}

const useAsyncMutation = (mutationHook) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);

    const [mutate] = mutationHook();

    const executeMutation = async(toastMessage, ...args) => {
        setIsLoading(true);
        const toastId = toast.loading(toastMessage || "Updating data....");
        const [formData, navigate, role] = args;

        const data = {...formData, role};

        try {
            const res = await mutate(data); 
            if(res.data) {
                toast.success(res.data.message || "Updated data successfully", {
                    id: toastId,
                });
                setData(res.data);
                if(role === "FDO") navigate(`/app/patient/${res.data.patient._id}`, {
                    state: { patient: res.data.patient }
                })
                else navigate('/');
            }
            else toast.error(res?.error?.data?.message || "Something went wrong", { id: toastId })
        }
        catch(error) {
            toast.error("Something went wrong", { id: toastId })
        }
        finally {
            setIsLoading(false);
        }
    }

    return [executeMutation, isLoading, data];
}

const useCreateMutation = (mutationHook) => {
    const [isLoading, setIsLoading] = useState(false);
    const [mutate] = mutationHook();

    const executeMutation = async(toastMessage, ...args) => {
        setIsLoading(true);
        const toastId = toast.loading(toastMessage || "Creating data....");
        const [formData, navigate, role] = args;

        const data = { ...formData, role }

        try {
            const res = await mutate(data); 
            if(res.data) {
                toast.success(res.data.message || "Created data successfully", {
                    id: toastId,
                });
                if(role === "FDO") navigate(`/app/patient/${res.data.patient._id}`, {
                    state: { patient: res.data.patient }
                })
                else navigate("/");
            }
            else toast.error(res?.error?.data?.message || "Something went wrong", { id: toastId })
        }
        catch(error) {
            toast.error("Something went wrong", { id: toastId })
        }
        finally {
            setIsLoading(false);
        }
    }

    return [executeMutation, isLoading];
}

export { useErrors, useAsyncMutation, useCreateMutation }