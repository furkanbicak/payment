import { useState } from "react";

const useFormErrors = () => {
    const [hasErrors, setHasErrors] = useState(false);
    const [hasNotTouched, setHasNotTouched] = useState(true);

    const onFieldsChange = (changedFields, allFields) => {
        const hasError = allFields.find(({ errors }) => errors.length > 0) !== undefined;
        setHasErrors(hasError);

        if (allFields.find(({ touched }) => touched === false)) {
            setHasNotTouched(true)
        } else {
            setHasNotTouched(false)
        }
    };
    return { hasErrors, hasNotTouched, onFieldsChange };
};
export default useFormErrors;
