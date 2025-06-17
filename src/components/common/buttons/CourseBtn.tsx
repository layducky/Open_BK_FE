"use client";

import { createCourse, deleteCourse } from "@/services/course/courseCollab";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Modal from "@/components/modals/formModal";
import { useMutation } from "@tanstack/react-query";
import { courseSchema } from "@/lib/validation/courseSchema";
import InputField from "../InputField";
import GradientButton from "./GradientButton";


export const CreateCourseBtn: React.FC = () => {
    const [authorID, setAuthorID] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null); 

    const { mutate, error } = useMutation({
        mutationFn: (data: any) => createCourse({
            authorID: data.authorID,
            // image: image as Blob, 
            courseName: data.courseName,
            description: data.description,
            category: data.category,
            price: data.price,
        }),
        onSuccess: () => {
            alert("Course created successfully!");
            setIsOpen(false);
            window.location.reload();
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(courseSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const onClose = () => setIsOpen(false);

    const handleClick = () => {
        setIsOpen(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setImagePreview(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const formFields = [
        { label: "Author ID", type: "hidden", id: "authorID", placeholder: "", disabled: false },
        { label: "Course Name", type: "text", id: "courseName", placeholder: "Course Name", disabled: false },
        { label: "Description", type: "text", id: "description", placeholder: "Description", disabled: false },
        { label: "Category", type: "text", id: "category", placeholder: "Category", disabled: false },
        { label: "Price", type: "number", id: "price", placeholder: "Price", disabled: false }
    ];

    useEffect(() => {
        const storedAuthorID = sessionStorage.getItem("userID");
        if (storedAuthorID) {
            setAuthorID(storedAuthorID);
        }
        
    }, []);

    return (
        <>
            <GradientButton onClick={handleClick} text="Create New Course" />
            <Modal modelTitle="Create New Course" isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-6">
                    {formFields.map(({ label, id, placeholder, disabled }) => (
                        <label key={id} className="block">
                            <InputField
                                label={label}
                                id={id}
                                type="text"
                                register={register}
                                value={id === "authorID" ? authorID || "" : ""}
                                placeholder={placeholder}
                                error={errors.courseName}
                                disabled={disabled}
                            />
                        </label>
                    ))}
                    <label className="block">
                        <span className="text-gray-700">Image</span>
                        <Input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 block w-full"
                        />
                        {imagePreview && (
                            <div className="mt-2">
                                <img src={imagePreview} alt="Image preview" className="w-32 h-32 object-cover" />
                            </div>
                        )}
                    </label>
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

export const DeleteCourseBtn: React.FC<{ courseID: string }> = ({ courseID }) => {

    const handleClick = async() => {
        const response = await deleteCourse(courseID);
        alert(response.message || response.error);
        window.location.reload();
    };

    return (
        <GradientButton onClick={handleClick} text="Delete" />
    );
};


