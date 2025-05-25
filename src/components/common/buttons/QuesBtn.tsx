"use client";

import { createQuestion, deleteQuestion } from "@/services/course/question";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Modal from "@/components/modals/courseModal";
import { useMutation } from "@tanstack/react-query";
import { questionSchema } from "@/lib/validation/questionSchema";
import InputField from "../InputField";


export const CreateQuesBtn: React.FC<{ unitID: string }> = ({ unitID }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { mutate, error } = useMutation({
        mutationFn: (data: any) => createQuestion({
            unitID: data.unitID,
            numericalOrder: data.numericalOrder,
            content: data.content,
            explanation: data.explanation,
            correctAnswer: data.correctAnswer,
            answerA: data.answerA,
            answerB: data.answerB,
            answerC: data.answerC,
            answerD: data.answerD
        }),
        onSuccess: () => {
            alert("Unit created successfully!");
            setIsOpen(false);
            window.location.reload();
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(questionSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const onClose = () => setIsOpen(false);

    const handleClick = () => {
        setIsOpen(true);
    };

    const formFields = [
        { label: "Unit ID", type: "hidden", id: "unitID", placeholder: "", disabled: false },
        { label: "NumericalOrder", type: "number", id: "numericalOrder", placeholder: "NumericalOrder", disabled: false },
        { label: "Content", type: "text", id: "content", placeholder: "Content", disabled: false },
        { label: "Explanation", type: "text", id: "explanation", placeholder: "Explanation", disabled: false },
        { label: "CorrectAnswer", type: "text", id: "correctAnswer", placeholder: "CorrectAnswer", disabled: false },
        { label: "Answer A", type: "text", id: "answerA", placeholder: "Enter Answer A", disabled: false },
        { label: "Answer B", type: "text", id: "answerB", placeholder: "Enter Answer B", disabled: false },
        { label: "Answer C", type: "text", id: "answerC", placeholder: "Enter Answer C", disabled: false },
        { label: "Answer D", type: "text", id: "answerD", placeholder: "Enter Answer D", disabled: false },
    ];


    return (
        <>
            <button
            onClick={handleClick}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
               Create New Question 
            </span>
        </button>
            <Modal modelTitle="Create New Unit" isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-6">
                    {formFields.map(({ label, id, placeholder, disabled }) => (
                        <label key={id} className="block">
                            <InputField
                                label={label}
                                id={id}
                                type="text"
                                register={register}
                                value={id === "unitID" ? unitID || "" : ""}
                                placeholder={placeholder}
                                error={errors[id as keyof typeof errors]}
                                disabled={disabled}
                            />
                        </label>
                    ))}
                    <div className="flex justify-center">
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};


export const DeleteQuesBtn: React.FC<{ questionID: string }> = ({ questionID }) => {

    const handleClick = async() => {
        const response = await deleteQuestion(questionID);
        alert(response.message || response.error);
        window.location.reload();
    };

    return (
        <>
            <button
            onClick={handleClick}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Delete 
                </span>
            </button>
        </>
    );
};

