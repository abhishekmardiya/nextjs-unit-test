import { InputField } from "@/components/input-fields/InputField";
import { fireEvent, render, screen } from "@testing-library/react";

// Note: This test only mocks and evaluates the InputField component itself, not the actual implementation used in app/page.tsx.
describe("InputField", () => {
  const label = "First Name";
  const name = "firstName";
  const placeholder = "John";

  // jest.fn() --> to create a mock function
  const mockHandleChange = jest.fn();
  const InputFieldElement = (
    <InputField
      label={label}
      name={name}
      value=""
      onChange={mockHandleChange}
      placeholder={placeholder}
      required
    />
  );

  it("renders correctly with label and placeholder", () => {
    // render --> to render the component
    render(InputFieldElement);

    // getByPlaceholderText --> to get the element by the placeholder text
    const inputElement = screen.getByPlaceholderText(placeholder);
    // toBeInTheDocument --> to check if the element is in the document
    expect(inputElement).toBeInTheDocument();

    // getByText --> to get the element by the text
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    render(InputFieldElement);

    // getByRole --> to get the element by the role
    const inputElement = screen.getByRole("textbox");
    // fireEvent.change --> to fire the change event
    fireEvent.change(inputElement, { target: { value: "Jane" } });

    // toHaveBeenCalledTimes --> to check if the function has been called the number of times specified
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it("shows error if required and blurred with empty value", () => {
    render(InputFieldElement);

    const inputElement = screen.getByRole("textbox");
    // fireEvent.blur --> to fire the blur event
    fireEvent.blur(inputElement);

    const errorMessage = screen.getByText(`${label} is required.`);
    expect(errorMessage).toBeInTheDocument();
  });

  it("does not show error if required and value is present", () => {
    render(
      <InputField
        label={label}
        name={name}
        value="John"
        onChange={mockHandleChange}
        placeholder={placeholder}
        required
      />
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.blur(inputElement);

    // queryByText --> to get the element by the text and return null if not found
    const errorMessage = screen.queryByText(`${label} is required.`);
    // not.toBeInTheDocument --> to check if the element is not in the document
    expect(errorMessage).not.toBeInTheDocument();
  });
});
