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

    // The handleChange prop should NOT have been called.
    expect(mockHandleChange).not.toHaveBeenCalled();
  });
});
