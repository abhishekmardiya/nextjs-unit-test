import { render, screen, fireEvent } from "@testing-library/react";
import { ImageUpload } from "@/components/input-fields/ImageUpload";

describe("ImageUpload", () => {
  const mockHandleChange = jest.fn();
  const FileUploadElement = <ImageUpload handleChange={mockHandleChange} />;

  it("calls handleChange with the correct file when a file is selected", () => {
    render(FileUploadElement);

    // creating dummy file
    const file = new File(["dummy content"], "profile.png", {
      type: "image/png",
    });
    // getting file input
    const fileInput = screen.getByTestId("file-upload");
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockHandleChange).toHaveBeenCalledTimes(1);
    expect(mockHandleChange).toHaveBeenCalledWith(
      // it check mock function is called with the correct file position
      expect.objectContaining({
        target: expect.objectContaining({
          files: expect.arrayContaining([file]),
        }),
      })
    );
  });

  it("calls handleChange when a single valid file is dropped", () => {
    render(FileUploadElement);

    const file = new File(["dummy content"], "profile.jpg", {
      type: "image/jpeg",
    });
    const dataTransfer = { files: [file] };
    const dropZone = screen.getByTestId("drop-zone");
    if (dropZone) {
      // fireEvent.drop --> to fire the drop event (mimic drag and drop)
      fireEvent.drop(dropZone, { dataTransfer });
    }

    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it("does not call handleChange when a single non-image file is dropped", () => {
    render(FileUploadElement);

    const nonImageFile = new File(["dummy content"], "document.pdf", {
      type: "application/pdf",
    });
    const dataTransfer = { files: [nonImageFile] };
    const dropZone = screen.getByTestId("drop-zone");

    if (dropZone) {
      fireEvent.drop(dropZone, { dataTransfer });
    }

    expect(mockHandleChange).not.toHaveBeenCalled();
  });

  describe("ImageUpload", () => {
    it("clears the error message after a successful file has been uploaded", () => {
      render(FileUploadElement);

      // Step 1: Trigger an error by dropping multiple files.
      const file1 = new File(["dummy content"], "profile.png", {
        type: "image/png",
      });
      const file2 = new File(["dummy2 content"], "profile2.jpg", {
        type: "image/jpeg",
      });

      const dropZone = screen.getByTestId("drop-zone");
      if (dropZone) {
        fireEvent.drop(dropZone, { dataTransfer: { files: [file1, file2] } });
      }

      expect(screen.getByTestId("error-message")).toBeInTheDocument();

      // Step 2: Select a single valid file to clear the error.
      const validFile = new File(["dummy content"], "profile.png", {
        type: "image/png",
      });

      if (dropZone)
        fireEvent.drop(dropZone, { dataTransfer: { files: [validFile] } });

      // use getByTestId only when the element must exist
      // use queryByText when the element might not be present
      expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
    });
  });
});
