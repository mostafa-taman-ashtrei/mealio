import { File, UploadCloud } from "lucide-react";
import ReactDropzone, { FileRejection } from "react-dropzone";

import { cn } from "@/lib/utils";

type DropZoneProps = {
    isUploading: boolean;
    // eslint-disable-next-line no-unused-vars
    handleUpload: (acceptedFile: File[]) => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    handleError: (fileRejections: FileRejection[]) => void;
    maxDocumentSize: number;
    multiple: boolean;
}

const UploadDropZone: React.FC<DropZoneProps> = ({
    isUploading,
    maxDocumentSize,
    handleUpload,
    handleError,
    multiple
}) => {

    const acceptedFileTypes = {
        "image/jpeg": [], // Accept JPEG files
        "image/jpg": [], // Accept JPG files
        "image/png": [],   // Accept PNG files
    };

    return (
        <ReactDropzone
            multiple={multiple}
            noClick={true}
            maxFiles={3}
            maxSize={maxDocumentSize}
            onDropRejected={(rejections) => handleError(rejections)}
            onDropAccepted={(acceptedFiles) => handleUpload(acceptedFiles)}
            accept={acceptedFileTypes}
        >
            {({ getRootProps, getInputProps }) => (
                <div
                    {...getRootProps()}
                    className={cn(
                        "m-4 h-60 rounded-lg border-2  border-dashed border-gray-300",
                        isUploading && "animate-pulse"
                    )}
                >
                    <div className="flex h-full w-full items-center justify-center">
                        <label
                            htmlFor="dropzone-file"
                            className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg"
                        >
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                <UploadCloud className="mb-2 h-14 w-14 text-zinc-500" />
                                <p className="mb-2 text-sm text-zinc-700">
                                    <span className="font-semibold">
                                        Click to upload
                                    </span>
                                    {" "}
                                    or
                                    {" "}
                                    <span className="font-semibold">
                                        drag and drop
                                    </span>
                                    {" "}
                                    your image(s) here
                                </p>
                            </div>


                            <input
                                {...getInputProps({ disabled: isUploading })}
                                type="file"
                                id="dropzone-file"
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            )}
        </ReactDropzone>
    );
};

export default UploadDropZone;