/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { PostTypes } from "../PostAddUpdate/PostAddUpdate"
import type { FC } from "react"
import { Controller, type Control } from "react-hook-form"
import Select, { type StylesConfig } from "react-select"

interface IRHFSelect {
    control: Control<PostTypes>
    name:
        | "title"
        | "description"
        | "hasTarget"
        | "status"
        | "targetAmount"
        | "collectedAmount"
        | "amountType"
        | "hasDeadline"
        | "startDate"
        | "endDate"
        | "metaData"
        | "address"
    options: Record<string, string>[]
    isMulti?: boolean
    valueKey?: string
}

const customReactSelectStyle: StylesConfig = {
    control: (baseStyles, { isDisabled, isFocused }) => ({
        ...baseStyles,
        borderWidth: isFocused ? "0" : "2px",
        borderRadius: "0.5rem",
        borderColor: isFocused ? "none" : "#e9ebee",
        boxShadow: "none",
        outline: isFocused ? "2px solid #000" : "none",
        backgroundColor: isDisabled ? "#e5e5e5" : "#fff",
        color: isDisabled ? "#898989" : "#000",
        maxHeight: "20px",
        padding: 0,
        fontSize: "0.9rem",
    }),
    placeholder: (baseStyles) => ({
        ...baseStyles,
        fontStyle: "italic",
    }),
    menu: (baseStyles) => ({
        ...baseStyles,
        border: "2px solid #e9ebee",
        overflow: "hidden",
        borderRadius: "0.5rem",
        boxShadow: "none",
    }),
    option: (baseStyles, { isFocused, isSelected }) => ({
        ...baseStyles,
        backgroundColor: isSelected
            ? "#000"
            : isFocused
            ? "rgba(0, 0, 0, 0.15)"
            : "#fff",
        color: isSelected ? "#fff" : "#000",
    }),
}

const RHFSelect: FC<IRHFSelect> = ({
    control,
    name,
    options,
    isMulti = false,
    valueKey = "value",
    ...rest
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={undefined}
            render={({ field, fieldState: {} }) => (
                <>
                    <Select
                        {...rest}
                        {...field}
                        options={options}
                        isMulti={isMulti}
                        className="capitalize"
                        value={options?.find(
                            (option) => option[valueKey] === field.value
                        )}
                        onChange={(selectedOptions) => {
                            const selectedValue = isMulti
                                ? selectedOptions
                                : // @ts-ignore-next-line
                                  selectedOptions[valueKey]
                            field.onChange(selectedValue)
                        }}
                        onBlur={field.onBlur}
                        styles={customReactSelectStyle}
                    />
                </>
            )}
        />
    )
}

export default RHFSelect
