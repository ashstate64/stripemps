import { useState, useCallback, useMemo } from 'react';

export interface UseFormStateOptions<T> {
  initialValues: T;
  validate?: (values: T) => Record<string, string[]>;
  onSubmit?: (values: T) => void | Promise<void>;
}

export function useFormState<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormStateOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateValue = useCallback(
    (field: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field as string]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const updateValues = useCallback((newValues: Partial<T>) => {
    setValues((prev) => ({ ...prev, ...newValues }));
  }, []);

  const setFieldTouched = useCallback((field: keyof T, isTouched = true) => {
    setTouched((prev) => ({ ...prev, [field]: isTouched }));
  }, []);

  const validateForm = useCallback(() => {
    if (!validate) return true;

    const validationErrors = validate(values);
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  }, [validate, values]);

  const handleSubmit = useCallback(async () => {
    if (!onSubmit) return;

    setIsSubmitting(true);

    try {
      if (validateForm()) {
        await onSubmit(values);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [onSubmit, validateForm, values]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }, [values, initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    updateValue,
    updateValues,
    setFieldTouched,
    validateForm,
    handleSubmit,
    resetForm,
  };
}
