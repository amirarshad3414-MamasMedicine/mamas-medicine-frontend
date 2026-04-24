import { useEffect } from "react";

/**
 * Hook to pre-fill form fields with data from formData prop
 * Matches input name attributes with keys in formData
 *
 * Usage:
 * useFormDataFill(formData, {
 *   'parent-name': 'parent-name',      // maps formData['parent-name'] to input[name="parent-name"]
 *   'child-name': 'child-name',
 * })
 */
export function useFormDataFill(formData, fieldMap = {}) {
  useEffect(() => {
    if (!formData || Object.keys(formData).length === 0) return;

    // If no field map provided, try to auto-match all inputs
    setTimeout(() => {
      const inputs = document.querySelectorAll("input, textarea, select");

      inputs.forEach((input) => {
        const fieldName = input.name;

        // Check if field is in explicit fieldMap or auto-match
        const dataKey = fieldMap[fieldName] || fieldName;

        if (formData.hasOwnProperty(dataKey)) {
          const value = formData[dataKey];

          if (input.type === "radio") {
            // For radio buttons, check the one matching the value
            if (input.value === value) {
              input.checked = true;
              // Trigger change event if needed for styled radios
              input.dispatchEvent(new Event("change", { bubbles: true }));
            }
          } else if (input.type === "checkbox") {
            // For checkboxes, check if value is in array or matches
            input.checked = Array.isArray(value)
              ? value.includes(input.value)
              : value === input.value;
            input.dispatchEvent(new Event("change", { bubbles: true }));
          } else {
            // For text inputs, textareas, selects, etc.
            input.value = value || "";
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }
      });
    }, 100); // Small delay to ensure DOM is ready
  }, [formData, fieldMap]);
}
