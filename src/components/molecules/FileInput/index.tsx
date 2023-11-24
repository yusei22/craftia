import React, { useRef } from 'react';

const IMAGE_ID = 'imageId';

export type FileInputProps = {
    setFileList: (v: FileList | null) => void;
    children?: React.ReactNode;
    className?: string;
    accept?: string;
    multiple?: boolean;
};

export const FileInput = ({
    setFileList,
    children,
    className,
    accept,
    multiple,
}: FileInputProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget?.files) {
            setFileList(e.currentTarget.files);
        }
    };

    return (
        <label className={className} id={IMAGE_ID}>
            <input
                css={{
                    display: 'none',
                }}
                type="file"
                ref={fileInputRef}
                id={IMAGE_ID}
                onChange={handleFileChange}
                accept={accept}
                multiple={multiple}
            />
            {children}
        </label>
    );
};
