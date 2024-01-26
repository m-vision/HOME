import Text from "./Text";
import { cn } from "../utils/helpers";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import React, {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import {
  Text as ReactNativeText,
  View,
  type TextProps,
  type ViewProps,
} from "react-native";

const Form = FormProvider;

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  const contextValue = useMemo(() => ({ name: props.name }), [props.name]);
  return (
    <FormFieldContext.Provider value={contextValue}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);

  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

interface FormItemContextValue {
  id: string;
}

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = forwardRef<View, ViewProps>(({ className, ...props }, ref) => {
  const id = props.id ?? Math.random().toString(36);
  const contextValue = useMemo(() => ({ id }), [id]);

  return (
    <FormItemContext.Provider value={contextValue}>
      <View ref={ref} className={cn("mb-2 space-y-1", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = forwardRef<
  ElementRef<typeof Text>,
  ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => {
  const { error } = useFormField();

  return (
    <Text
      ref={ref}
      className={cn(`${error && "text-darkPurple-900"}`, className)}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = forwardRef<
  ElementRef<typeof View>,
  ComponentPropsWithoutRef<typeof View>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <View
      ref={ref}
      id={formItemId}
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = forwardRef<ReactNativeText, TextProps>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
      <Text
        ref={ref}
        id={formDescriptionId}
        className={cn("text-darkPurple-900 opacity-50 px-4 py-2", className)}
        {...props}
      />
    );
  },
);
FormDescription.displayName = "FormDescription";

const FormMessage = forwardRef<ReactNativeText, TextProps>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <Text
        ref={ref}
        id={formMessageId}
        className={cn("text-error-500 px-4 py-2", className)}
        {...props}
      >
        {body}
      </Text>
    );
  },
);
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
