import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "./form-fields/InputField";
import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";
import { Modal } from "./Modal";
import { NativeSelect } from "./NativeSelect";

interface CreateRoomModalProps {
    onRequestClose: () => void;
    data?: {
        first_name: string;
        last_name: string;
        language: string;
    };
    edit?: boolean;
}

export const SignupUserModal: React.FC<CreateRoomModalProps> = ({
                                                                    onRequestClose,
                                                                    data,
                                                                    edit,
                                                                }) => {
    return (
        <Modal isOpen onRequestClose={onRequestClose} ariaHideApp={false}>
            <Formik<{
                first_name: string;
                language: string;
                last_name: string;
            }>
                initialValues={
                    data
                        ? data
                        : {
                            first_name: "",
                            last_name: "",
                            language: "C",
                        }
                }
                validateOnChange={false}
                validateOnBlur={false}
                validate={({ first_name, last_name }) => {
                    const errors: Record<string, string> = {};

                    if (first_name.length < 2 || first_name.length > 60) {
                        return {
                            first_name: "length must be between 2 to 60 characters",
                        };
                    } else if (last_name.length < 2 || last_name.length > 60) {
                        return {
                            last_name: "length must be between 2 to 60 characters",
                        };
                    }

                    return errors;
                }}
                onSubmit={async ({ first_name, last_name, language }) => {
                    const d = { first_name, last_name, language };
                    console.log(d);
                    onRequestClose();
                }}
            >
                {({ setFieldValue, values, isSubmitting }) => (
                    <Form className={`grid grid-cols-3 gap-4 focus:outline-none w-full`}>
                        <div className={`col-span-3 block`}>
                            <h4 className={`mb-2 text-primary-100`}>
                                Profile
                            </h4>
                            <div className={`text-primary-300`}>
                                Please fill the details below to create your account
                            </div>
                        </div>
                        <div className={`flex h-full w-full col-span-2`}>
                            <InputField
                                className={`rounded-8 bg-primary-700 h-6`}
                                name="first_name"
                                maxLength={60}
                                placeholder="First Name"
                                autoFocus
                                autoComplete="off"
                            />
                        </div>
                        <div className={`flex h-full w-full col-span-2`}>
                            <InputField
                                className={`rounded-8 bg-primary-700 h-6`}
                                name="last_name"
                                maxLength={60}
                                placeholder="Last Name"
                                autoComplete="off"
                            />
                        </div>
                        <div className={`grid items-start grid-cols-1 h-6`}>
                            <NativeSelect
                                value={values.language}
                                onChange={(e) => {
                                    setFieldValue("language", e.target.value);
                                }}
                            >
                                <option value="C" className={`hover:bg-primary-900`}>
                                    C
                                </option>
                                <option value="CPP" className={`hover:bg-primary-900`}>
                                    C++
                                </option>
                                <option value="PYTHON" className={`hover:bg-primary-900`}>
                                    Python
                                </option>
                                <option value="JAVA" className={`hover:bg-primary-900`}>
                                    Java
                                </option>
                            </NativeSelect>
                        </div>

                        <div className={`flex pt-2 space-x-3 col-span-full items-center`}>
                            <Button loading={isSubmitting} type="submit" className={`mr-3`}>
                                Submit
                            </Button>
                            <ButtonLink type="button" onClick={onRequestClose}>
                                Cancel
                            </ButtonLink>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};
